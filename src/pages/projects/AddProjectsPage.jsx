import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDirtyContext } from "../../providers/DirtyProvider";
import AddPageComponent from "../../components/AddPageComponent";
import DialogComponent from "../../components/DialogComponent";
import { setDocumentTitle } from "../../utils/global";
import ButtonComponent from "../../components/ButtonComponent";
import { GetFormComponent } from "./GetFormComponent";
import useProjectStore from "../../store/useProjectStore";
import { use } from "react";
import useCheckListStore from "../../store/useChecklistStore";
import axiosInstance from "../../utils/axiosHelper";

const AddProjectsPage = () => {
  const { states } = useProjectStore();

  const { checkLists, setCheckLists } = useCheckListStore();

  const { projects, setProjects } = useProjectStore();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.project);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);

  const [selectedListOfAssignee, setSelectedListOfAssignee] = useState([]);

  const [assignee, setAssignee] = useState([]);

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = async () => {
    try {
      setProjects([
        ...projects,
        {
          ...formData,
          project_id: projects.length + 1,
          status: [
            {
              project_timestamps_id: "1f9bdcdb-efc4-4127-8781-0926157c8de7",
              project_id: "10457bf7-1129-4d3c-b10d-f2ae4e0d5279",
              user_id: "b1e3ce17-4b01-48fa-aef8-8f41cf677176",
              status: "Not Started",
              remarks: "",
              datetime: new Date(),
              created_at: new Date(),
              updated_at: new Date(),
              full_name: "Benjie Pecson",
            },
          ],
          assignee: assignee,
          checklist: checkLists,
        },
      ]);

      toast.success("Project has been successfully added!");
      navigate("/projects");

      return;
      const { quote_id, created_at, updated_at, ...filteredData } = formData;

      setIsFormSubmitting(true);

      const response = await axiosInstance.post("/quotes", {
        form_data: filteredData,
        timestamp: {
          status: "Drafted",
          remarks: "",
        },
      });
      if (response.status == 200) {
        toast.success("Quote has been successfully added!");
        navigate("/quotes");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error in adding the record.");
    } finally {
      handleSubmitDialog();
      setIsFormSubmitting(false);
    }
  };

  const handleOnSelectChange = (name, value, error_message) => {
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const setToDefault = async () => {
    let form_data = { ...states.project };
    // Loop through each key and set its value to an empty string
    for (let key in form_data) {
      if (form_data.hasOwnProperty(key)) {
        form_data[key] = "";
      }
    }
    setErrors(form_data);
    setSelectedListOfAssignee([]);
    setCheckLists([]);
    setPageIsLoading(false);
  };

  const fetchActiveUsers = async () => {
    try {
      const response = await axiosInstance.get("/get-all-active-users");
      setActiveUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newAssignee = selectedListOfAssignee.map((selected) => {
      return activeUsers.find((user) => user.user_id == selected.value);
    });
    setAssignee(newAssignee);
  }, [selectedListOfAssignee]);

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  setDocumentTitle("Add New - Projects");

  return (
    <>
      <AddPageComponent
        items={[
          { title: "Projects", goto: "/projects" },
          { title: "Add New Project", goto: "/projects/add-new" },
        ]}
        title="Add New Project"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo="/projects"
        formComponent={GetFormComponent({
          formData,
          handleOnSelectChange,
          setFormData,
          errors,
          setErrors,
          setIsDirty,
          checkLists,
          setCheckLists,
          activeUsers,
          assignee,
          setAssignee,
          selectedListOfAssignee,
          setSelectedListOfAssignee,
        })}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Project"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={handleSubmit}
            >
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

export default AddProjectsPage;
