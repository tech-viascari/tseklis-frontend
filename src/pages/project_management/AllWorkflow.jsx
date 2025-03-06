import { Typography } from "@material-tailwind/react";
import MainContent from "../layouts/MainContent";
import TopBar from "../layouts/TopBar";
import ButtonComponent from "../../components/ButtonComponent";
import DataProvider from "../../providers/DataProvider";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import TableComponent from "../../components/TableComponent";

const AllWorkflow = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const workflowSampleData = [
    {
      company: "FULLSUITE1",
      workflow: "sec registration",
      open: "asdad",
      closed: "asdasd",
      remarks: "asdasd",
      assignee: "sasdasd",
    },

    {
      company: "FULLSUITE2",
      workflow: "sec registration",
      open: "asdad",
      closed: "asdasd",
      remarks: "asdasd",
      assignee: "sasdasd",
    },
    {
      company: "FULLSUITE3",
      workflow: "sec registration",
      open: "asdad",
      closed: "asdasd",
      remarks: "asdasd",
      assignee: "sasdasd",
    },
  ];

  const columns = [
    {
      name: "Company",
      selector: (row) => `${row.company}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToUser(row);
            }}
          >
            {row.company}
          </Typography>
        );
      },
    },
    {
      name: "Workflow",
      selector: (row) => `${row.workflow}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToUser(row);
            }}
          >
            {row.workflow}
          </Typography>
        );
      },
    },
    {
      name: "Open",
      selector: (row) => `${row.open}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToUser(row);
            }}
          >
            {row.open}
          </Typography>
        );
      },
    },
    {
      name: "Closed",
      selector: (row) => `${row.closed}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToUser(row);
            }}
          >
            {row.closed}
          </Typography>
        );
      },
    },
    {
      name: "Remarks",
      selector: (row) => `${row.remarks}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToUser(row);
            }}
          >
            {row.remarks}
          </Typography>
        );
      },
    },
    {
      name: "Assigned To",
      selector: (row) => `${row.assignee}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToUser(row);
            }}
          >
            {row.assignee}
          </Typography>
        );
      },
    },
  ];

  const tabs = [
    {
      title: "All Companies",
      content: (
        <div className="flex-1 h-full">
          <div>
            <TableComponent
              columns={columns}
              data={workflowSampleData}
              // onClick={navigateToUser}
            />
          </div>
        </div>
      ),
    },
    {
      title: "VGC",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Account Settings</h2>
          <p className="text-gray-600">
            Manage your preferences and account options.
          </p>
        </div>
      ),
    },
    {
      title: "Computer Share",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Notifications</h2>
          <p className="text-gray-600">
            Check and configure your notification settings.
          </p>
        </div>
      ),
    },
  ];

  const navigateToUser = (row) => {
    navigate("/users/view/" + row.user_id);
    setUser(row);
  };
  return (
    <>
      <div className="w-full relative">
        <TopBar items={[{ title: "Project Management", goto: "/workflow" }]} />
        <DataProvider>
          <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
            <div className="pt-[60px] ">
              <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-5 h-full ">
                  <div className="flex flex-row justify-between items-center border rounded-lg p-4 border-[#CEDEE1]">
                    <div className="">
                      <Typography variant="small" className="font-bold text-xl">
                        Workflow
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-sm flex flex-row items-center"
                      >
                        <div className="flex flex-col pr-4 border-r border-[#CEDEE1]">
                          <div className="flex flex-row">
                            {" "}
                            <p className="text-md font-medium">
                              Ongoing Workflows
                            </p>
                            <IoIosArrowDown className="my-1 ml-1" />
                          </div>

                          <p>N/A</p>
                        </div>
                        <div className="flex flex-col px-4 border-r border-[#CEDEE1]">
                          <div className="flex flex-row">
                            {" "}
                            <p className="text-md font-medium">Ongoing Tasks</p>
                            <IoIosArrowDown className="my-1 ml-1" />
                          </div>

                          <p>N/A</p>
                        </div>
                        <div className="flex flex-col px-4 border-r border-[#CEDEE1]">
                          <div className="flex flex-row">
                            {" "}
                            <p className="text-md font-medium">
                              Ongoing Subtasks
                            </p>
                            <IoIosArrowDown className="my-1 ml-1" />
                          </div>

                          <p>N/A</p>
                        </div>
                      </Typography>
                    </div>
                    <div>
                      <ButtonComponent
                        onClick={() => {
                          navigate("/users/add-new");
                        }}
                      >
                        Add New Workflow
                      </ButtonComponent>
                    </div>
                  </div>
                  <div className="w-full mx-auto">
                    {/* Tab Navigation */}
                    <div className="flex border-b">
                      {tabs.map((tab, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`
              px-4 py-2 transition-colors duration-300
              ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
                        >
                          {tab.title}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 bg-white rounded-lg shadow-md">
                      {tabs[activeTab].content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DataProvider>
      </div>
    </>
  );
};

export default AllWorkflow;
