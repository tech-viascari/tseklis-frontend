import React, { useState } from "react";
import AddPageComponent from "../../../components/AddPageComponent";
import InputComponent from "../../../components/InputComponent";
import DialogComponent from "../../../components/DialogComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { Switch, Typography } from "@material-tailwind/react";
import { useDirtyContext } from "../../../providers/DirtyProvider";
import axiosInstance from "../../../utils/axiosHelper";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ReviewComponent from "../../../components/ReviewComponent";
import useRoleStore from "../../../store/useRoleStore";
import SelectMultipleComponent from "../../../components/SelectMultipleComponent";
import { handleOnChange } from "../../../utils/global";
import useUserStore from "../../../store/useUserStore";
import SelectComponent from "../../../components/SelectComponent";

const AddUsersPage = () => {
  const { states, setUser, users } = useUserStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.user);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = async () => {
    try {
      const { role_id, created_at, updated_at, ...filteredData } = formData;
      const response = await axiosInstance.post("/users", filteredData);
      if (response.status == 200) {
        toast.success("User has been successfully added!");
        navigate("/users");
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
      "User Information",
      <>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 pb-20">
            <InputComponent
              label="First Name"
              required={true}
              name="first_name"
              value={formData.first_name}
              error_message={errors.first_name}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "First Name is required",
                  setIsDirty
                );
              }}
            />
            <InputComponent
              label="Middle Name"
              name="middle_name"
              value={formData.middle_name}
              error_message={errors.middle_name}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "",
                  setIsDirty,
                  false
                );
              }}
            />
            <InputComponent
              label="Last Name"
              required={true}
              name="last_name"
              value={formData.last_name}
              error_message={errors.last_name}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Last Name is required",
                  setIsDirty
                );
              }}
            />

            <div className="flex flex-col gap-2">
              <InputComponent
                label="Viascari Email Address"
                required={true}
                name="email"
                type="email"
                value={formData.email}
                error_message={errors.email}
                placeholder="example@viascari.com"
                onChange={(e) => {
                  handleOnChange(
                    e,
                    formData,
                    setFormData,
                    errors,
                    setErrors,
                    "Email is required",
                    setIsDirty
                  );
                }}
              />
            </div>

            <InputComponent
              label="Password"
              required={true}
              name="password"
              type="password"
              value={formData.password}
              error_message={errors.password}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Password is required",
                  setIsDirty
                );
              }}
            />
            <InputComponent
              label="Slack ID"
              name="slack_id"
              value={formData.slack_id}
              error_message={errors.slack_id}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "",
                  setIsDirty
                );
              }}
            />

            <div className="flex flex-col gap-1">
              <Typography variant="small" className={`mb-1 font-normal`}>
                Status <span className="text-red-400">*</span>
              </Typography>
              <div className="flex flex-row items-center h-10 gap-3">
                <Switch
                  name="status"
                  checked={formData.status == "Active"}
                  className="checked:bg-primary"
                  onChange={(e) => {
                    const { checked } = e.target;
                    setFormData({
                      ...formData,
                      status: checked ? "Active" : "Inactive",
                    });
                  }}
                />
                <Typography variant="small" className="font-normal text-sm">
                  {formData.status}
                </Typography>
              </div>
              {errors.active && (
                <label className="text-xs text-red-500 flex flex-row gap-1 items-center">
                  <HiMiniExclamationTriangle size={15} />
                  {errors.active}
                </label>
              )}
            </div>
          </div>
        </div>
      </>
    ),
    getFormState(
      "Role",
      <>
        <div className="flex flex-col gap-3">
          <SelectMultipleComponent
            label="Role"
            error_message={errors.roles}
            name={"roles"}
            onSelectChange={(values) => {
              setFormData({
                ...formData,
                roles: [{ role_name: values.label, role_id: values.value }],
              });
            }}
            required
            labelClass={""}
            options={options}
            isMulti={false}
            closeMenuOnSelect={true}
          />
        </div>
      </>
    ),
    getFormState(
      "Review Information",
      <>
        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="User Information"
            data={[
              {
                name: "First Name",
                value: formData.first_name,
              },
              {
                name: "Middle Name",
                value: formData.middle_name,
              },
              {
                name: "Last Name",
                value: formData.last_name,
              },
              {
                name: "Email",
                value: formData.email,
              },
              {
                name: "Slack ID",
                value: formData.slack_id,
              },
              {
                name: "Status",
                value: formData.status,
              },
            ]}
          />
          <ReviewComponent
            title=""
            data={[
              {
                name: "Roles",
                value: formData.roles.map((role) => role.role_name).join(", "),
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

    const response = await axiosInstance.get("/roles");

    if (response.status == 200) {
      const roles = response.data.map((role) => {
        return {
          value: role.role_id,
          label: role.role_name,
        };
      });
      setOptions(roles);
    }
    setPageIsLoading(false);
  };

  return (
    <>
      <AddPageComponent
        items={[
          { title: "Users", goto: "/users" },
          { title: "Add New User", goto: "/users/add-new" },
        ]}
        title="Add New User"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo="/users"
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New User"
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

export default AddUsersPage;
