import React, { useState } from "react";
import AddPageComponent from "../../../components/AddPageComponent";
import InputComponent from "../../../components/InputComponent";
import useUserStore from "../../../store/useUserStore";
import DialogComponent from "../../../components/DialogComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { Switch, Typography } from "@material-tailwind/react";
import { useDirtyContext } from "../../../providers/DirtyProvider";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import axiosInstance from "../../../utils/axiosHelper";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import usePermissionStore from "../../../store/usePermissionStore";
import ReviewComponent from "../../../components/ReviewComponent";
import PageDeniedComponent from "../../../components/PageDeniedComponent";
import useAuthStore from "../../../store/useAuthStore";

const AddPermissionsPage = () => {
  const { states, setPermissions, permissions } = usePermissionStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const { user, hasPermission } = useAuthStore();

  const [formData, setFormData] = useState(states.permission);

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
      const { permission_id, created_at, updated_at, ...newPermission } =
        formData;
      const response = await axiosInstance.post("/permissions", newPermission);
      if (response.status == 200) {
        toast.success("User has been successfully added!");
        navigate("/permissions");
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
      "Permission Information",
      <>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <InputComponent
              label="Permission Name"
              required={true}
              name="permission_name"
              value={formData.permission_name}
              error_message={errors.permission_name}
              onChange={(e) => {
                handleOnChange(e, "Permission Name is required.");
              }}
            />
          </div>
        </div>
      </>
    ),
    getFormState(
      "Review Information",
      <>
        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="Permission Information"
            data={[
              {
                name: "Permission Name",
                value: formData.permission_name,
              },
            ]}
          />
        </div>
      </>
    ),
  ];

  const setToDefault = () => {
    let form_data = { ...states.permission };
    // Loop through each key and set its value to an empty string
    for (let key in form_data) {
      if (form_data.hasOwnProperty(key)) {
        form_data[key] = "";
      }
    }
    setErrors(form_data);
    setPageIsLoading(false);
  };

  if (!hasPermission(user, "Add Permissions")) {
    return (
      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <PageDeniedComponent />
      </div>
    );
  }

  return (
    <>
      <AddPageComponent
        items={[
          { title: "Permissions", goto: "/permissions" },
          { title: "Add New Permission", goto: "/permissions/add-new" },
        ]}
        title="Add New Permission"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo="/permissions"
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Permission"
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

export default AddPermissionsPage;
