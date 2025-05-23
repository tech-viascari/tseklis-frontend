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
  Progress,
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
import { HiMiniBell, HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import ChecklistPage from "./checklist/ChecklistPage";
import NotesPage from "./notes/NotesPage";
import useProjectStore from "../../store/useProjectStore";
import useCheckListStore from "../../store/useChecklistStore";

const ViewProjectPage = () => {
  const response = {
    project_id: "1",
    project_name: "INCORPORATION",
    project_desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptatum exercitationem velit quos et consequuntur corrupti aut nam accusantium magni, delectus distinctio quibusdam voluptas eos, molestiae laudantium non laboriosam necessitatibus.",
    start_date: new Date(),
    target_due_date: new Date(),
    assignee: [
      {
        user_id: "u001",
        name: "Alice Smith",
        picture:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
      },
      {
        user_id: "u002",
        name: "Emma Johnson",
        picture:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
      },
      {
        user_id: "u003",
        name: "Richard Hayes",
        picture:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
      },
      {
        user_id: "u004",
        name: "Ethan Walker",
        picture:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      },
      {
        user_id: "u005",
        name: "Lucas Carter",
        picture:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      },
    ],
    status: "In Progress",
    pending_action_from: "Client",
    date_completed: null,
    google_project_folder: [],
  };

  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { quotes, setQuote, setQuotes } = useQuoteStore();

  const { user, hasPermission } = useAuthStore();

  const [selectedTab, setSelectedTab] = useState("checklist");

  const { project, setProject, states } = useProjectStore();
  const { checkLists, setCheckLists } = useCheckListStore();

  // const [project, setProject] = useState(response);

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

  const fetchProjectsData = () => {
    setProject(response);
  };

  useEffect(() => {
    setDocumentTitle("Projects");
    // fetchProjectsData();
    setCheckLists(project.checklist);
  }, []);

  return (
    <div className="w-full relative">
      <TopBar
        items={[
          { title: "Projects", goto: "/projects" },
          {
            title: project.project_name,
            goto: `/projects/view/${project.project_id}`,
          },
        ]}
      />

      <DataProvider tableName="/quotes" setData={() => {}}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px] h-screen">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3  justify-between items-center  ">
                      <Typography variant="small" className="font-bold text-xl">
                        {project.project_name}
                      </Typography>
                      <div className="flex w-max flex-row gap-2">
                        {project.status.length != 0 && (
                          <ButtonComponent
                            variant="outlined"
                            className="py-1 px-4 text-secondary text-sm"
                            onClick={() => {}}
                          >
                            {project.status[0].status}
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
                      <Typography
                        variant="small"
                        className="font-normal text-sm"
                      >
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
                          <Typography
                            variant="small"
                            className="text-sm font-medium"
                          >
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
                          <Typography
                            variant="small"
                            className="text-sm font-medium"
                          >
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
                          <Typography
                            variant="small"
                            className="text-sm font-medium"
                          >
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
                          <Typography
                            variant="small"
                            className="text-sm font-medium"
                          >
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
                          <Typography
                            variant="small"
                            className="text-sm font-normal"
                          >
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
                {/* <div className="flex flex-col h-full">
                  <Tabs value="notes" className="h-full">
                    <TabsHeader>
                      {tabData.map(({ label, value }) => (
                        <Tab key={value} value={value} className="z-0">
                          <Typography
                            variant="small"
                            className="font-normal text-sm"
                          >
                            {label}
                          </Typography>
                        </Tab>
                      ))}
                    </TabsHeader>
                    <TabsBody className="h-full">
                      {tabData.map(({ value, desc }) => (
                        <TabPanel
                          key={value}
                          value={value}
                          className="h-full flex-auto"
                        >
                          {desc}
                        </TabPanel>
                      ))}
                    </TabsBody>
                  </Tabs>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </DataProvider>
    </div>
  );
};

export default ViewProjectPage;
