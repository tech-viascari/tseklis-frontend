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
  const [workflowPage, setWorkflowPage] = useState();

  // Define navigateToWorkflow before it is used
  const navigateToWorkflow = (row) => {
    navigate("/workflow/view/" + row.workflow_id);
    setWorkflowPage(row);
  };

  const workflowSampleData = [
    {
      workflow_id: 1,
      company: "UtakPOS",
      workflow: "INCORPORATION",
      open: "01/02/2025",
      closed: "",
      remarks: "",
      assignee: "Hannah",
    },

    {
      workflow_id: 2,
      company: "Bold Business",
      workflow: "INCORPORATION",
      open: "01/02/2025",
      closed: "",
      remarks: "",
      assignee: "Hannah",
    },
    {
      workflow_id: 3,
      company: "Growth Rocket",
      workflow: "INCORPORATION",
      open: "01/02/2025",
      closed: "",
      remarks: "",
      assignee: "Hannah",
    },
  ];

  const columns = [
    {
      name: "Legal Entity",
      selector: (row) => `${row.company}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToWorkflow(row);
            }}
          >
            {row.company}
          </Typography>
        );
      },
    },
    {
      name: "Project",
      selector: (row) => `${row.workflow}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToWorkflow(row);
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
              navigateToWorkflow(row);
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
              navigateToWorkflow(row);
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
              navigateToWorkflow(row);
            }}
          >
            {row.remarks}
          </Typography>
        );
      },
    },
    {
      name: "Assignee",
      selector: (row) => `${row.assignee}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToWorkflow(row);
            }}
          >
            {row.assignee}
          </Typography>
        );
      },
    },
    {
      name: "Requestor",
      selector: (row) => `${row.assignee}`,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToWorkflow(row);
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
              onClick={navigateToWorkflow}
            />
          </div>
        </div>
      ),
    },
    {
      title: "VGC",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">TBA</h2>
        </div>
      ),
    },
    {
      title: "Computer Share",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">TBA</h2>
        </div>
      ),
    },
  ];

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
                        All Projects
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-sm flex flex-row items-center"
                      >
                        <div className="flex flex-col pr-4 border-r border-[#CEDEE1]">
                          <div className="flex flex-row">
                            {" "}
                            <p className="text-md font-medium">
                              Ongoing Projects
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
                          navigate("/project/add-project");
                        }}
                      >
                        Add New Project
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
