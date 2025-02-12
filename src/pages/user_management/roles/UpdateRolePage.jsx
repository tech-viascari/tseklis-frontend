import React, { useEffect, useState } from "react";
import UpdatePageComponent from "../../../components/UpdatePageComponent";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import ReviewComponent from "../../../components/ReviewComponent";
import { handleOnChange } from "../../../utils/global";
import { useDirtyContext } from "../../../providers/DirtyProvider";
import ButtonComponent from "../../../components/ButtonComponent";
import InputComponent from "../../../components/InputComponent";
import axiosInstance from "../../../utils/axiosHelper";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useRoleStore from "../../../store/useRoleStore";
import SelectMultipleComponent from "../../../components/SelectMultipleComponent";

const UpdateRolePage = () => {
  const { role_id } = useParams();
  const navigate = useNavigate();
  const { states, role, setRole, roles, setRoles } = useRoleStore();

  const { setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.role);
  const [errors, setErrors] = useState({});

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const [options, setOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const updateData = { ...role, ...formData };

      const response = await axiosInstance.patch(
        `/role/${role_id}`,
        updateData
      );

      if (response.status == 200) {
        navigate("/roles/view/" + role_id);
        toast.success("Role updated successfully.");
      } else {
        throw Error("Failed to update the record.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the record.");
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
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Role Name is required.",
                  setIsDirty
                );
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
            label="Roles"
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
              setDefaultOptions(values);
            }}
            value={defaultOptions}
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
            title=""
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
    let form_data = { ...states.role };
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/role/${role_id}`);
      if (response.status == 200) {
        setFormData(response.data.role);
        const defaultPermissions = response.data.role.permissions.map(
          (permission) => {
            return {
              label: permission.permission_name,
              value: permission.permission_id,
            };
          }
        );
        setDefaultOptions(defaultPermissions);
      }
    };
    fetchData();
    setToDefault();
  }, []);

  return (
    <div>
      <UpdatePageComponent
        items={[
          { title: "Roles", goto: "/roles" },
          {
            title: "Update Role",
            goto: `/roles/update/:${role.role_id}`,
          },
        ]}
        goBackTo={"/roles"}
        title={"Role"}
        handleSubmitDialog={handleSubmitDialog}
        formComponent={formComponent}
        pageIsLoading={pageIsLoading}
      ></UpdatePageComponent>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Update Role
          </Typography>
        </DialogHeader>
        <hr className="border-light-gray" />
        <DialogBody className="text-dark">
          <div className="flex flex-col gap-2">
            <Typography variant="small" className="font-normal text-sm">
              Are you sure you want to update this record?
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
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
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UpdateRolePage;
