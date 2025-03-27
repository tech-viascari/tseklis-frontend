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
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { formattedDate, handleOnChange } from "../../../utils/global";
import { useDirtyContext } from "../../../providers/DirtyProvider";
import ButtonComponent from "../../../components/ButtonComponent";
import InputComponent from "../../../components/InputComponent";
import usePermissionStore from "../../../store/usePermissionStore";
import axiosInstance from "../../../utils/axiosHelper";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useAuthStore from "../../../store/useAuthStore";
import PageDeniedComponent from "../../../components/PageDeniedComponent";

const UpdatePermissionPage = () => {
  const { permission_id } = useParams();
  const navigate = useNavigate();
  const { states, permission, setPermission, permissions, setPermissions } =
    usePermissionStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const { user, hasPermission } = useAuthStore();

  const [formData, setFormData] = useState(states.permission);
  const [errors, setErrors] = useState({});

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const updatePermission = { ...permission, ...formData };
      const response = await axiosInstance.patch(
        `/permission/${permission_id}`,
        updatePermission
      );

      if (response.status == 200) {
        navigate("/permissions/view/" + permission_id);
        toast.success("Permission updated successfully.");
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
      "Permission Information",
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          <InputComponent
            label="Permission Name"
            required={true}
            name="permission_name"
            value={formData.permission_name}
            error_message={errors.permission_name}
            onChange={(e) => {
              handleOnChange(
                e,
                formData,
                setFormData,
                errors,
                setErrors,
                "Permission Name is required.",
                setIsDirty
              );
            }}
          />
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

  const setToDefault = async () => {
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/permission/${permission_id}`);
      if (response.status == 200) {
        setFormData(response.data.permission);
      }
    };
    fetchData();
    setToDefault();
  }, []);

  if (!hasPermission(user, "Update Permissions")) {
    return (
      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <PageDeniedComponent />
      </div>
    );
  }

  return (
    <div>
      <UpdatePageComponent
        items={[
          { title: "Permissions", goto: "/permissions" },
          {
            title: "Update Permission",
            goto: `/permissions/update/:${permission.permission_id}`,
          },
        ]}
        goBackTo={"/permissions"}
        title={"Permission"}
        handleSubmitDialog={handleSubmitDialog}
        formComponent={formComponent}
        pageIsLoading={pageIsLoading}
      ></UpdatePageComponent>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Update Permission
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

export default UpdatePermissionPage;
