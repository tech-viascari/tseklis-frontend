import React, { useState } from "react";
import AddPageComponent from "../../components/AddPageComponent";
import InputComponent from "../../components/InputComponent";
import DialogComponent from "../../components/DialogComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { Switch, Typography } from "@material-tailwind/react";
import { useDirtyContext } from "../../providers/DirtyProvider";
import axiosInstance from "../../utils/axiosHelper";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ReviewComponent from "../../components/ReviewComponent";
import useRoleStore from "../../store/useRoleStore";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import { handleOnChange } from "../../utils/global";
import useUserStore from "../../store/useUserStore";
import SelectComponent from "../../components/SelectComponent";
import useProjectStore from "../../store/useProjectStore";
import FileLinksTable from "./AddRowInputPrereq";
import { FaLink } from "react-icons/fa";
import TaskTable from "./TaskTable";

const AddUsersPage = () => {
  const { states, setUser, users } = useProjectStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.project);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = async () => {
    try {
      //   const { role_id, created_at, updated_at, ...filteredData } = formData;
      //   const response = await axiosInstance.post("/users", filteredData);
      //   if (response.status == 200) {
      //     toast.success("User has been successfully added!");
      //     navigate("/users");
      console.log(formData);
      //   }
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
      "Project Information",
      <>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 pb-5">
            <InputComponent
              label="Project Name"
              required={true}
              name="project_name"
              value={formData.project_name}
              error_message={errors.project_name}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Project Name is Require",
                  setIsDirty
                );
              }}
            />
            <InputComponent
              label="Requester"
              required={true}
              name="project_requester"
              value={formData.project_requester}
              error_message={errors.project_requester}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Requester is Require",
                  setIsDirty
                );
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 pb-5">
            <InputComponent
              label="Legal Entity"
              required={true}
              name="project_legal_entity"
              value={formData.project_legal_entity}
              error_message={errors.project_legal_entity}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Project Name is Require",
                  setIsDirty
                );
              }}
            />
            <InputComponent
              label="Assignee"
              required={true}
              name="project_assignee"
              value={formData.project_assignee}
              error_message={errors.project_assignee}
              onChange={(e) => {
                handleOnChange(
                  e,
                  formData,
                  setFormData,
                  errors,
                  setErrors,
                  "Requester is Require",
                  setIsDirty
                );
              }}
            />
          </div>

          {/* FileLinksTable component */}
          <div className="pb-10">
            <h3 className="text-lg font-semibold">Prerequisite Files</h3>
            <FileLinksTable
              rows={formData.project_prereq}
              setRows={(newRows) =>
                setFormData({ ...formData, project_prereq: newRows })
              }
            />
          </div>
        </div>
      </>
    ),
    getFormState(
      "Add Task",
      <>
        <div className="flex flex-col gap-3">
          <TaskTable
            tasks={formData.project_tasks}
            setTasks={(newTasks) =>
              setFormData({ ...formData, project_tasks: newTasks })
            }
          />
        </div>
      </>
    ),
    getFormState(
      "Review Information",
      <>
        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="Project Information"
            data={[
              {
                name: "Project Name",
                value: formData.project_name,
              },
              {
                name: "Requester",
                value: formData.project_requester,
              },
              {
                name: "Assignee",
                value: formData.project_assignee,
              },
              {
                name: "Legal Entity",
                value: formData.project_name,
              },
            ]}
          />

          <ReviewComponent
            title="Pre-requisite"
            data={[
              ...formData.project_prereq.map((prereq, index) => ({
                name: prereq.file,
                value: <a href={prereq.link}>{prereq.file}</a>,
              })),
            ]}
          />

          <ReviewComponent
            title="Task"
            data={[
              {
                name: (
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">
                          Task Name
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Priority Level
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Target Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.project_tasks.map((task, index) => (
                        <tr key={index} className="border">
                          <td className="border px-4 py-2">{task.name}</td>
                          <td className="border px-4 py-2">
                            {task.priority || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {task.date || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ),
              },
            ]}
          />
          {/* <ReviewComponent
            title=""
            data={[
              {
                name: "Roles",
                value: formData.roles.map((role) => role.role_name).join(", "),
              },
            ]}
          /> */}
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
          { title: "Project", goto: "/users" },
          { title: "Add New Project", goto: "/users/add-new" },
        ]}
        title="Add New Project"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo="/workflow"
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
