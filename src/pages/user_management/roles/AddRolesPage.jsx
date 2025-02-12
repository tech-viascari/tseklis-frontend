import React, { useState } from "react";
import AddPageComponent from "../../../components/AddPageComponent";
import InputComponent from "../../../components/InputComponent";
import DialogComponent from "../../../components/DialogComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { Typography } from "@material-tailwind/react";
import { useDirtyContext } from "../../../providers/DirtyProvider";
import axiosInstance from "../../../utils/axiosHelper";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ReviewComponent from "../../../components/ReviewComponent";
import useRoleStore from "../../../store/useRoleStore";
import SelectMultipleComponent from "../../../components/SelectMultipleComponent";

const AddRolesPage = () => {
  const { states, setRoles, roles } = useRoleStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.role);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleOnChange = (e, error_message) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setIsDirty(true);
  };

  const handleSubmit = async () => {
    try {
      const { role_id, created_at, updated_at, ...filteredData } = formData;
      const response = await axiosInstance.post("/roles", filteredData);
      if (response.status == 200) {
        toast.success("Role has been successfully added!");
        navigate("/roles");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error in adding the record.");
    } finally {
      handleSubmitDialog();
    }
  };

  const getFormState = (title, form_contents) => {
    const formState = {
      title: "",
      form_contents: <></>,
    };

    return {
      ...formState,
      title,
      form_contents,
    };
  };

  const [options, setOptions] = useState([]);

  const formComponent = [
    getFormState(
      "Role Information",
      <>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <InputComponent
              label="Role Name"
              required={true}
              name="role_name"
              value={formData.role_name}
              error_message={errors.role_name}
              onChange={(e) => {
                handleOnChange(e, "Role Name is required.");
              }}
            />
          </div>
        </div>
      </>
    ),
    getFormState(
      "Permissions",
      <>
        <div className="flex flex-col gap-3">
          <SelectMultipleComponent
            label="Permissions"
            error_message={""}
            name={"permissions"}
            onSelectChange={(values) => {
              let selected = values.map((selected) => {
                return {
                  permission_id: selected.value,
                  permission_name: selected.label,
                };
              });

              setFormData({ ...formData, permissions: selected });
            }}
            required
            labelClass={""}
            options={options}
            isMulti={true}
          />
        </div>
      </>
    ),
    getFormState(
      "Review Information",
      <>
        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="Role Information"
            data={[
              {
                name: "Role Name",
                value: formData.role_name,
              },
            ]}
          />
          <ReviewComponent
            title="Permissions"
            data={[
              {
                name: "Permissions",
                value: formData.permissions
                  .map((permission) => permission.permission_name)
                  .join(", "),
              },
            ]}
          />
        </div>
      </>
    ),
  ];

  const setToDefault = async () => {
    let form_data = { ...states.permission };
    // Loop through each key and set its value to an empty string
    for (let key in form_data) {
      if (form_data.hasOwnProperty(key)) {
        form_data[key] = "";
      }
    }
    setErrors(form_data);

    const response = await axiosInstance.get("/permissions");

    if (response.status == 200) {
      const permissions = response.data.map((permission) => {
        return {
          value: permission.permission_id,
          label: permission.permission_name,
        };
      });
      setOptions(permissions);
    }
    setPageIsLoading(false);
  };

  return (
    <>
      <AddPageComponent
        items={[
          { title: "Roles", goto: "/roles" },
          { title: "Add New Role", goto: "/roles/add-new" },
        ]}
        title="Add New Role"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo="/roles"
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Role"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleSubmit}>
              Yes
            </ButtonComponent>
          </div>
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure you want to add this record?
        </Typography>
      </DialogComponent>
    </>
  );
};

export default AddRolesPage;
