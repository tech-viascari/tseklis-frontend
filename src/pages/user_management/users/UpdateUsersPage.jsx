import React, { useEffect, useState } from "react";
import UpdatePageComponent from "../../../components/UpdatePageComponent";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
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
import useUserStore from "../../../store/useUserStore";

const UpdateUsersPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { states, user, setUser, users, setUsers } = useUserStore();

  const { setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.user);
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
      const updateData = { ...user, ...formData };

      const response = await axiosInstance.patch(
        `/user/${user_id}`,
        updateData
      );

      if (response.status == 200) {
        navigate("/users/view/" + user_id);
        toast.success("User updated successfully.");
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

            <InputComponent
              label="Email"
              required={true}
              name="email"
              type="email"
              value={formData.email}
              error_message={errors.email}
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
            <InputComponent
              label="Password"
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
                  "",
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
            defaultValue={defaultOptions}
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
    let form_data = { ...states.user };
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/user/${user_id}`);
      if (response.status == 200) {
        const userState = { password: "", ...response.data.user };
        setFormData(userState);
        const defaultRole = response.data.user.roles.map((role) => {
          return {
            label: role.role_name,
            value: role.role_id,
          };
        });
        setDefaultOptions(defaultRole);
      }
    };
    fetchData();
    setToDefault();
  }, []);

  return (
    <div>
      <UpdatePageComponent
        items={[
          { title: "Users", goto: "/users" },
          {
            title: "Update User",
            goto: `/users/update/:${user.user_id}`,
          },
        ]}
        goBackTo={"/users"}
        title={"User"}
        handleSubmitDialog={handleSubmitDialog}
        formComponent={formComponent}
        pageIsLoading={pageIsLoading}
      ></UpdatePageComponent>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Update User
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

export default UpdateUsersPage;
