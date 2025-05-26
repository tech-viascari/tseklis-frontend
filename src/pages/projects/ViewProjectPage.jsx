import React, { useEffect, useState } from "react";
import TopBar from "../layouts/TopBar";
import PageDeniedComponent from "../../components/PageDeniedComponent";
import useDrawerStore from "../../store/useDrawerStore";
import { useNavigate } from "react-router";
import useQuoteStore from "../../store/useQuoteStore";
import useAuthStore from "../../store/useAuthStore";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import ButtonComponent from "../../components/ButtonComponent";
import { formattedDate, setDocumentTitle } from "../../utils/global";
import {
  HiMiniExclamationCircle,
  HiMinusCircle,
  HiOutlineClock,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import ChecklistPage from "./checklist/ChecklistPage";
import NotesPage from "./notes/NotesPage";
import useProjectStore from "../../store/useProjectStore";
import useCheckListStore from "../../store/useChecklistStore";
import ViewPageComponent from "../../components/ViewPageComponent";
import DialogComponent from "../../components/DialogComponent";
import TimelineComponent from "../../components/TimelineComponent";
import TextAreaComponent from "../../components/TextAreaComponent";
import InputComponent from "../../components/InputComponent";
import SelectMultipleComponent from "../../components/SelectMultipleComponent";
import axiosInstance from "../../utils/axiosHelper";
import { toast } from "sonner";

const ViewProjectPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [selectedTab, setSelectedTab] = useState("checklist");

  const { project, setProject, states, projects, setProjects } =
    useProjectStore();
  const { checkLists, setCheckLists } = useCheckListStore();

  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedListOfAssignee, setSelectedListOfAssignee] = useState([]);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [statusDialog, setStatusDialog] = useState(false);
  const statusHandlerDialog = () => {
    setStatusDialog(!statusDialog);
  };

  const [changeStatusDialog, setChangeStatusDialog] = useState(false);
  const changeStatusHandlerDialog = (newStatus = project.status[0].status) => {
    setChangeStatusDialog(!changeStatusDialog);
    setSelectedStatus(newStatus);
  };

  const [updateDetailsDialog, setUpdateDetailsDialog] = useState(false);
  const updateDetailsHandlerDialog = () => {
    setUpdateDetailsDialog(!updateDetailsDialog);
  };

  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteHandlerDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const [timelines, setTimelines] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("Not Started");

  const [beforeStatus, setBeforeStatus] = useState("Not Started");

  const [formData, setFormData] = useState(states.project);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e, error_message) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const [remarks, setRemarks] = useState("");

  const formattedTimeline = (timestamps = []) => {
    if (timestamps.length === 0) {
      return [];
    }

    const timelineState = {
      title: "",
      date: new Date(),
      name: "",
      description: "",
      action_component: <></>,
    };

    const customClassName = `bg-transparent text-black border border-black hover:bg-black/80 hover:text-white hover:border-secondary font-sm focus:!border-black py-1`;

    const actionComponents = {
      Drafted: (
        <>
          <div className="flex flex-row gap-3">
            <ButtonComponent
              className={customClassName}
              onClick={() => {
                setRemarks("");
                setStatus("Sent for Signature");
                setChangeStatusDialog(true);
                setStatusDialog(false);
              }}
            >
              Mark as 'Sent for Signature'
            </ButtonComponent>
          </div>
        </>
      ),
      "Sent for Signature": (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Signed");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Signed'
          </ButtonComponent>
        </div>
      ),
      Signed: (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Sent Invoice");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Sent Invoice'
          </ButtonComponent>
        </div>
      ),
      "Sent Invoice": (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Paid");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Paid'
          </ButtonComponent>
        </div>
      ),
      Paid: (
        <div className="flex flex-row gap-3">
          <ButtonComponent
            className={customClassName}
            onClick={() => {
              setRemarks("");
              setStatus("Completed");
              setChangeStatusDialog(true);
              setStatusDialog(false);
            }}
          >
            Mark as 'Completed'
          </ButtonComponent>
        </div>
      ),
    };

    const timeline = timestamps.map((timestamp, index) => {
      const actionComponent =
        actionComponents[timestamp.status] && index == 0 ? (
          actionComponents[timestamp.status]
        ) : (
          <></>
        );
      return {
        ...timelineState,
        title: timestamp.status,
        date: timestamp.datetime,
        name: timestamp.full_name,
        description: timestamp.remarks,
        action_component: actionComponent,
      };
    });

    return timeline;
  };

  const tabData = [
    {
      label: "Checklist",
      value: "checklist",
      desc: (
        <ChecklistPage checkLists={checkLists} setCheckLists={setCheckLists} />
      ),
    },
    {
      label: "Notes",
      value: "notes",
      desc: <NotesPage />,
    },
    // {
    //   label: "Updates",
    //   value: "updates",
    //   desc: <UpdatesPage />,
    // },
  ];

  const fetchActiveUsers = async () => {
    try {
      const response = await axiosInstance.get("/get-all-active-users");
      setActiveUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDocumentTitle("Projects");
    fetchActiveUsers();
  }, []);

  useEffect(() => {
    setFormData(project);
    setCheckLists(project.checklist);
    const timeline = formattedTimeline(project.status);
    setTimelines(timeline);
  }, [project]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <ViewPageComponent
        items={[
          { title: "Projects", goto: "/projects" },
          {
            title: project.project_name,
            goto: `/projects/view/${project.project_id}`,
          },
        ]}
        title={project.project_name}
        subtitle={""}
        sideButtonComponent={
          <div className="flex w-max flex-row gap-2">
            <div className="flex w-max flex-row gap-2">
              <div>
                {project.status.length != 0 &&
                project.status[0].status == "Completed" ? (
                  <ButtonComponent
                    variant="outlined"
                    className=" text-secondary text-sm"
                    onClick={() => {
                      statusHandlerDialog();
                    }}
                  >
                    {project.status[0].status}
                  </ButtonComponent>
                ) : (
                  <Select
                    className="!border-light-gray focus:!border-light-gray text-dark text-center"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={selectedStatus}
                    onChange={(value) => {
                      if (value != project.status[0].status) {
                        changeStatusHandlerDialog();
                      }
                      setSelectedStatus(value);
                      setBeforeStatus(value);
                    }}
                  >
                    <Option value="Not Started">Not Started</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Blocked">Blocked</Option>
                    <Option value="For Checking">For Checking</Option>
                    <Option value="Completed">Completed</Option>
                  </Select>
                )}
              </div>
              {project.status.length != 0 &&
                project.status[0].status != "Completed" && (
                  <ButtonComponent
                    variant="outlined"
                    className=" text-secondary text-sm"
                    onClick={() => {
                      statusHandlerDialog();
                    }}
                  >
                    <HiOutlineClock size={20} />
                  </ButtonComponent>
                )}
              <Menu>
                <MenuHandler>
                  <Button
                    variant="outlined"
                    className="bg-transparent border-light-gray"
                    size="sm"
                  >
                    <HiOutlineEllipsisHorizontal />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    className="text-dark"
                    onClick={updateDetailsHandlerDialog}
                  >
                    Edit Details
                  </MenuItem>

                  <hr className="my-1 text-light-gray" />

                  <MenuItem
                    onClick={() => {
                      deleteHandlerDialog();
                    }}
                  >
                    <span className="text-red-400">Delete</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-5 h-full">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              <div className="flex items-center -space-x-2">
                {project.assignee.map((user, index) => {
                  return (
                    <Tooltip content={user.name} key={user.user_id}>
                      <Avatar
                        variant="circular"
                        alt="user 1"
                        size="sm"
                        className="border-[1px] border-white hover:z-10 focus:z-10"
                        src={user.picture}
                      />
                    </Tooltip>
                  );
                })}
              </div>

              <Typography variant="small" className="font-normal text-sm">
                {project.desc}
              </Typography>

              <div className="flex flex-row gap-2 items-center">
                <Typography
                  variant="small"
                  className="font-normal text-sm bg-gray/40 px-3 rounded-xl"
                >
                  {formattedDate(project.start_date)}
                </Typography>
                <Typography variant="small" className="font-normal text-sm">
                  -
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-sm bg-gray/40 px-3 rounded-xl"
                >
                  {formattedDate(project.target_date)}
                </Typography>
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-12">
                  <div className="col-span-5 md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
                    <Typography variant="small" className="text-sm font-medium">
                      Google Drive Folder
                    </Typography>
                  </div>
                  <div className="col-span-7 md:col-span-7 lg:col-span-8 xl:col-span-9 2xl:col-span-10">
                    <div className="flex flex-row">
                      {project.google_project_folder.name != "" &&
                      project.google_project_folder.link != "" ? (
                        <a
                          href={
                            project.google_project_folder.name != "" &&
                            project.google_project_folder.link != ""
                              ? project.google_project_folder.link
                              : ""
                          }
                          target="_blank"
                        >
                          <Typography
                            variant="small"
                            className="text-sm font-normal text-blue-500 underline"
                          >
                            {project.google_project_folder.name != "" &&
                              project.google_project_folder.link != "" &&
                              project.google_project_folder.name}
                          </Typography>
                        </a>
                      ) : (
                        <Typography
                          variant="small"
                          className="text-sm font-normal"
                        >
                          --
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-5 md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
                    <Typography variant="small" className="text-sm font-medium">
                      Executed Documents
                    </Typography>
                  </div>
                  <div className="col-span-7 md:col-span-7 lg:col-span-8 xl:col-span-9 2xl:col-span-10">
                    <div className="flex flex-col gap-3">
                      {project.executed_documents.length > 0 ? (
                        project.executed_documents.map((doc) => {
                          if (doc.name == "") return;
                          return (
                            <div className="flex flex-row">
                              <a
                                href={doc.link != "" ? doc.link : ""}
                                target="_blank"
                              >
                                <Typography
                                  variant="small"
                                  className="text-sm font-normal text-blue-500 underline"
                                >
                                  {doc.name}
                                </Typography>
                              </a>
                            </div>
                          );
                        })
                      ) : (
                        <Typography
                          variant="small"
                          className="text-sm font-normal"
                        >
                          --
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
                    <Typography variant="small" className="text-sm font-medium">
                      Pending Action From
                    </Typography>
                  </div>
                  <div className="col-span-7 md:col-span-7 lg:col-span-8 xl:col-span-9 2xl:col-span-10">
                    {project.pending_action_from != "" ? (
                      <Typography
                        variant="small"
                        className="text-sm font-normal"
                      >
                        {project.pending_action_from}
                      </Typography>
                    ) : (
                      <Typography
                        variant="small"
                        className="text-sm font-normal"
                      >
                        --
                      </Typography>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
                    <Typography variant="small" className="text-sm font-medium">
                      Date Completed
                    </Typography>
                  </div>
                  <div className="col-span-7 md:col-span-7 lg:col-span-8 xl:col-span-9 2xl:col-span-10">
                    {project.date_completed != null ? (
                      <Typography
                        variant="small"
                        className="text-sm font-normal"
                      >
                        {project.date_completed != null &&
                          formattedDate(project.date_completed)}
                      </Typography>
                    ) : (
                      <Typography
                        variant="small"
                        className="text-sm font-normal"
                      >
                        --
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-2 justify-around p-1 rounded-lg w-full bg-light-gray/50 my-2 gap-1">
              {tabData.map((tab) => {
                return (
                  <div
                    key={`${tab.value}-tab`}
                    onClick={() => {
                      setSelectedTab(tab.value);
                    }}
                    className={`${
                      selectedTab == tab.value && "bg-white/90"
                    } transition-all duration-500 ease-in-out rounded-md w-full text-center cursor-pointer py-1 hover:bg-white/90 hover:shadow-sm`}
                  >
                    <Typography variant="small" className="text-sm font-normal">
                      {tab.label}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col h-full">
              {tabData.map((tab) => {
                if (tab.value == selectedTab) {
                  return (
                    <div key={`${tab.value}-desc`} className="h-full">
                      {tab.desc}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </ViewPageComponent>

      <DialogComponent
        dialogName={statusDialog}
        handlerDialog={statusHandlerDialog}
        title="Status"
        hideFooter={true}
        hideHeader={true}
        size="md"
      >
        <div className="p-5">
          <TimelineComponent timelines={timelines}></TimelineComponent>
        </div>
      </DialogComponent>

      <DialogComponent
        dialogName={changeStatusDialog}
        handlerDialog={() => {
          changeStatusHandlerDialog();
        }}
        title="Change Status"
        footerContent={
          <div className="flex flex-row items-center justify-center gap-5 w-full -mt-5 mb-2">
            <ButtonComponent
              className="bg-red-400"
              onClick={() => {
                changeStatusHandlerDialog();
              }}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={() => {
                let newStatus = {
                  project_timestamps_id: "1f9bdcdb-efc4-4127-8781-0926157c8de7",
                  project_id: "10457bf7-1129-4d3c-b10d-f2ae4e0d5279",
                  user_id: `${user.user_id}`,
                  status: beforeStatus,
                  remarks: remarks,
                  datetime: new Date(),
                  created_at: new Date(),
                  updated_at: new Date(),
                  full_name: `${user.first_name} ${user.last_name}`,
                };

                let newProject = {
                  ...project,
                  status: [newStatus, ...project.status],
                };

                if (beforeStatus == "Completed") {
                  newProject.date_completed = formData.date_completed;
                }

                setProject(newProject);

                setRemarks("");

                changeStatusHandlerDialog(beforeStatus);
              }}
            >
              Yes, proceed!
            </ButtonComponent>
          </div>
        }
        hideHeader={true}
      >
        <div className="flex flex-col gap-3 pt-5">
          <div className="flex flex-col items-center gap-2">
            <HiMiniExclamationCircle className="text-orange-500" size={50} />
            <Typography
              variant="small"
              className="font-bold text-md text-center"
            >
              Are you sure?
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-sm text-center"
            >
              You want to proceed to the next step?
            </Typography>
          </div>

          <div className="flex flex-col gap-3">
            {beforeStatus == "Completed" && (
              <InputComponent
                label="Date Completed"
                value={
                  formData.date_completed != null ? formData.date_completed : ""
                }
                onChange={(e) => {
                  setFormData({ ...formData, date_completed: e.target.value });
                }}
                type="date"
                required={true}
              />
            )}
            <TextAreaComponent
              label={"Remarks"}
              error_message=""
              name="remarks"
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
              }}
              labelClass=""
            />
          </div>
        </div>
      </DialogComponent>

      <DialogComponent
        dialogName={deleteDialog}
        handlerDialog={deleteHandlerDialog}
        title={`Delete Project`}
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={deleteHandlerDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={async () => {
                try {
                  setIsFormSubmitting(true);
                  console.log(projects);
                  const newProjects = projects.filter(
                    (_) => _.project_id != project.project_id
                  );
                  setProjects(newProjects);
                  navigate("/projects");
                } catch (error) {
                  console.log(error);
                  toast.error("There was an error deleting the record");
                } finally {
                  deleteHandlerDialog();
                  setIsFormSubmitting(false);
                }
              }}
            >
              Yes
            </ButtonComponent>
          </div>
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure? This action cannot be undone.
        </Typography>
      </DialogComponent>

      <DialogComponent
        size="lg"
        dialogName={updateDetailsDialog}
        handlerDialog={updateDetailsHandlerDialog}
        title="Update Details"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={updateDetailsHandlerDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={() => {
                console.log(formData);
                setProject(formData);
                updateDetailsHandlerDialog();
              }}
            >
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-5 pb-10 mb-20">
          <InputComponent
            label="Project Name"
            required={true}
            name="project_name"
            value={formData.project_name}
            error_message={errors.project_name}
            onChange={(e) => {
              handleOnChange(e, "Project Name is required.");
            }}
          />
          <TextAreaComponent
            label="Project Description"
            name="desc"
            value={formData.desc}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <InputComponent
              label="Project Start Date"
              required={true}
              name="start_date"
              value={formData.start_date == null ? "" : formData.start_date}
              type="date"
              onChange={(e) => {
                handleOnChange(e, "Start Date is required.");
              }}
            />
            <InputComponent
              label="Project Target Date"
              required={true}
              name="target_date"
              value={formData.target_date == null ? "" : formData.target_date}
              type="date"
              onChange={(e) => {
                handleOnChange(e, "Target Date is required.");
              }}
            />
          </div>
          <div>
            <InputComponent
              label="Pending Action From"
              name="pending_action_from"
              value={formData.pending_action_from}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>

          <SelectMultipleComponent
            label="Assignee"
            options={activeUsers.map((assignee) => {
              return {
                label: assignee.name,
                value: assignee.user_id,
              };
            })}
            name="assignee"
            value={selectedListOfAssignee}
            onSelectChange={(value) => {
              setSelectedListOfAssignee(value);
            }}
            className=""
            isMulti={true}
            required={true}
          ></SelectMultipleComponent>

          <div className="flex flex-col gap-2">
            <div>
              <Typography variant="small" className="text-sm font-medium">
                Google Drive Folder
              </Typography>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="col-span-1">
                <InputComponent
                  label="Text"
                  name="name"
                  value={formData.google_project_folder.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      google_project_folder: {
                        ...formData.google_project_folder,
                        name: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="col-span-1 lg:col-span-2">
                <InputComponent
                  label="URL"
                  name="link"
                  value={formData.google_project_folder.link}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      google_project_folder: {
                        ...formData.google_project_folder,
                        link: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <Typography variant="small" className="text-sm font-medium">
                Executed Documents
              </Typography>
              <ButtonComponent
                onClick={() => {
                  setFormData({
                    ...formData,
                    executed_documents: [
                      ...formData.executed_documents,
                      states.attachment_view,
                    ],
                  });
                }}
              >
                Add Row
              </ButtonComponent>
            </div>
            <div className="flex flex-row items-center justify-between gap-1 w-full">
              {formData.executed_documents.length != 0 ? (
                <div className="flex flex-col gap-3 w-full">
                  {formData.executed_documents.map((item, index) => {
                    return (
                      <div className="flex flex-row items-center justify-between gap-1 w-full">
                        <div className="w-[35%] flex">
                          <div className="w-full">
                            <InputComponent
                              label="Text"
                              name="name"
                              value={item.name}
                              onChange={(e) => {
                                let updatedExecutedDocuments =
                                  formData.executed_documents;
                                updatedExecutedDocuments[index] = {
                                  ...updatedExecutedDocuments[index],
                                  name: e.target.value,
                                };
                                setFormData({
                                  ...formData,
                                  executed_documents: updatedExecutedDocuments,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-[60%] flex">
                          <div className="w-full">
                            <InputComponent
                              label="URL"
                              name="link"
                              value={item.link}
                              onChange={(e) => {
                                let updatedExecutedDocuments =
                                  formData.executed_documents;
                                updatedExecutedDocuments[index] = {
                                  ...updatedExecutedDocuments[index],
                                  link: e.target.value,
                                };
                                setFormData({
                                  ...formData,
                                  executed_documents: updatedExecutedDocuments,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-[5%] flex mt-5 ml-2 flex-end">
                          <div className="w-full ">
                            <ButtonComponent
                              className="p-0"
                              onClick={() => {
                                const newDocuments =
                                  formData.executed_documents.filter(
                                    (_, idx) => index != idx
                                  );

                                setFormData({
                                  ...formData,
                                  executed_documents: newDocuments,
                                });
                              }}
                            >
                              <HiMinusCircle size={20} color="red" />
                            </ButtonComponent>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2 text-center w-full">
                    <Typography variant="small" className="text-sm font-bold">
                      No documents attached.
                    </Typography>
                    <Typography variant="small" className="text-sm font-normal">
                      Click the button{" "}
                      <span className="font-medium">"Add row"</span> to attach
                      documents.
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogComponent>
    </>
  );
};

export default ViewProjectPage;
