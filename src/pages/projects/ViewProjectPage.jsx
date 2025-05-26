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
  Progress,
  Select,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DataProvider from "../../providers/DataProvider";
import TableComponent from "../../components/TableComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { formattedDate, setDocumentTitle } from "../../utils/global";
import {
  HiMiniArrowTrendingUp,
  HiMiniBell,
  HiMiniExclamationCircle,
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
import SelectComponent from "../../components/SelectComponent";
import TextAreaComponent from "../../components/TextAreaComponent";
import InputComponent from "../../components/InputComponent";

const ViewProjectPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { quotes, setQuote, setQuotes } = useQuoteStore();

  const { user, hasPermission } = useAuthStore();

  const [selectedTab, setSelectedTab] = useState("checklist");

  const { project, setProject, states } = useProjectStore();
  const { checkLists, setCheckLists } = useCheckListStore();

  const [statusDialog, setStatusDialog] = useState(false);
  const statusHandlerDialog = () => {
    setStatusDialog(!statusDialog);
  };

  const [changeStatusDialog, setChangeStatusDialog] = useState(false);
  const changeStatusHandlerDialog = (newStatus = project.status[0].status) => {
    setChangeStatusDialog(!changeStatusDialog);
    setSelectedStatus(newStatus);
  };

  const [timelines, setTimelines] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("Not Started");

  const [beforeStatus, setBeforeStatus] = useState("Not Started");

  const [formData, setFormData] = useState(states.project);

  const [remarks, setRemarks] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");

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

  useEffect(() => {
    setDocumentTitle("Projects");
  }, []);

  useEffect(() => {
    console.log(project);
    setCheckLists(project.checklist);
    const timeline = formattedTimeline(project.status);
    setTimelines(timeline);
  }, [project]);

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
                  <MenuItem className="text-dark" onClick={() => {}}>
                    Edit Details
                  </MenuItem>

                  <hr className="my-1 text-light-gray" />

                  <MenuItem onClick={() => {}}>
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
                  user_id: "b1e3ce17-4b01-48fa-aef8-8f41cf677176",
                  status: beforeStatus,
                  remarks: remarks,
                  datetime: "2025-05-26T02:17:09.350Z",
                  created_at: "2025-05-26T02:17:09.350Z",
                  updated_at: "2025-05-26T02:17:09.350Z",
                  full_name: "Benjie Pecson",
                };

                let newProject = {
                  ...project,
                  status: [newStatus, ...project.status],
                };

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
                value={dateCompleted}
                onChange={(e) => {
                  setDateCompleted(e.target.value);
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
    </>
  );
};

export default ViewProjectPage;
