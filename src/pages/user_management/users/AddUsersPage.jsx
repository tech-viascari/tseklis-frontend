import React, { useState } from "react";
import AddPageComponent from "../../../components/AddPageComponent";
import InputComponent from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import useUserStore from "../../../store/useUserStore";
import DialogComponent from "../../../components/DialogComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { Switch, Typography } from "@material-tailwind/react";
import { useDirtyContext } from "../../../providers/DirtyProvider";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import axiosInstance from "../../../utils/axiosHelper";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AddUsersPage = () => {
  const { states, setUsers } = useUserStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.user);

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
      const {
        user_id,
        access_token,
        refresh_token,
        last_login,
        created_at,
        updated_at,
        ...newUser
      } = formData;

      const response = await axiosInstance.post("/users", newUser);
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

  const formComponent = [
    getFormState(
      "User Information",
      <>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <InputComponent
              label="First Name"
              required={true}
              name="first_name"
              value={formData.first_name}
              error_message={errors.first_name}
              onChange={(e) => {
                handleOnChange(e, "First Name is required.");
              }}
            />
            <InputComponent
              label="Middle Name"
              name="middle_name"
              value={formData.middle_name}
              error_message={errors.middle_name}
              onChange={(e) => {
                handleOnChange(e, "");
              }}
            />
            <InputComponent
              label="Last Name"
              required={true}
              name="last_name"
              value={formData.last_name}
              error_message={errors.last_name}
              onChange={(e) => {
                handleOnChange(e, "Last Name is required.");
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <InputComponent
              label="Email"
              required={true}
              name="email"
              value={formData.email}
              error_message={errors.email}
              onChange={(e) => {
                handleOnChange(e, "Email is required.");
              }}
            />
            <InputComponent
              label="Password"
              required={true}
              name="password"
              type="password"
              value={formData.password}
              error_message={errors.password}
              onChange={(e) => {
                handleOnChange(e, "Password is required.");
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <InputComponent
              label="Slack ID"
              name="slack_id"
              value={formData.slack_id}
              error_message={errors.slack_id}
              onChange={(e) => {
                handleOnChange(e, "");
              }}
            />
            <div className="flex flex-col gap-1">
              <Typography variant="small" className={`mb-1 font-normal`}>
                Status <span className="text-red-400">*</span>
              </Typography>
              <div className="flex flex-row items-center h-10">
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
  ];

  const setToDefault = () => {
    let form_data = { ...states.user };
    console.log(form_data);

    // Loop through each key and set its value to an empty string
    for (let key in form_data) {
      if (form_data.hasOwnProperty(key)) {
        form_data[key] = "";
      }
    }
    setErrors(form_data);
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
