import { Button, Typography } from "@material-tailwind/react";
import DataProvider from "../../providers/DataProvider";
import TopBar from "../layouts/TopBar";
import ButtonComponent from "../../components/ButtonComponent";
import { IoIosArrowDown } from "react-icons/io";
import { HiPencilAlt } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { GrTask } from "react-icons/gr";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";
import AccordionContent from "../../components/AccordionContent";
import PAFapplication from "../../components/PAFapplication";

const ViewWorkflow = () => {
  const [activeTab, setActiveTab] = useState(0);
  // Track open state for each accordion item independently
  const [openItems, setOpenItems] = useState([0]); // First item open by default

  const accordionItems = [
    {
      title: "Submit to ESPARC",
      content: <AccordionContent />,
    },
    {
      title: "Approval of COI",
      content: <AccordionContent />,
    },
    {
      title: "PAF",
      content: <PAFapplication />,
    },
  ];

  const toggleAccordion = (index) => {
    setOpenItems((prevOpenItems) => {
      // Check if the item is already open
      if (prevOpenItems.includes(index)) {
        // Remove it if it's already open
        return prevOpenItems.filter((item) => item !== index);
      } else {
        // Add it to the open items if it's closed
        return [...prevOpenItems, index];
      }
    });
  };

  const isItemOpen = (index) => {
    return openItems.includes(index);
  };

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Manager",
      status: "Away",
    },
  ]);

  const [newName, setNewName] = useState("");

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const addNewRow = () => {
    // Validate that name is not empty
    if (newName.trim() !== "") {
      const newId =
        tableData.length > 0
          ? Math.max(...tableData.map((item) => item.id)) + 1
          : 1;
      setTableData((prev) => [
        ...prev,
        {
          id: newId,
          name: newName,
          email: "",
          role: "New User",
          status: "Pending",
        },
      ]);
      setNewName("");
    }
  };

  const tabs = [
    {
      title: (
        <div className="flex items-center gap-2">
          <GrTask size={22} />
          <span>Task</span>
        </div>
      ),
      content: (
        <div className="flex-1 h-full  border rounded-lg p-4 border-[#CEDEE1]">
          <div className="border-b-2 border-[#CEDEE1]">TASK</div>

          <div className="w-full  mx-auto space-y-2 py-2">
            {accordionItems.map((item, index) => (
              <div
                key={index}
                className="border border-[#CEDEE1] rounded-md flex flex-col"
              >
                {/* up */}
                <div>
                  <div className="flex items-center w-full px-4 py-3 text-left font-medium text-gray-700 border-b border-[#CEDEE1] bg-[#f4f4f4] justify-between">
                    <div className="flex flex-row">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="p-1 mr-3 hover:bg-gray-100 rounded-full transition-colors "
                        aria-label="Toggle accordion"
                      >
                        <IoIosArrowDown
                          className={`transform transition-transform duration-200 ${
                            isItemOpen(index) ? "rotate-180" : ""
                          }`}
                          size={20}
                        />
                      </button>
                      <span className="flex border-r pr-3 border-[#CEDEE1] my-1">
                        {item.title}
                      </span>
                      <FaPencilAlt className="mx-3 my-2" />
                      <FaTrash className="mx-3 my-2" />
                    </div>
                    <div className="flex flex-row">
                      <p>6/9 </p> <FaRegCircle className="my-1 mx-2" />
                    </div>
                  </div>

                  <div className="flex items-center w-full px-4 py-3 text-left font-medium text-gray-700">
                    <div className="flex flex-col border-r border-[#CEDEE1] pr-2">
                      <div className="flex flex-row">
                        <h2>Status</h2>
                        <IoIosArrowDown className="py-1" size={21} />
                      </div>
                      <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 sm:bg-red-100 sm:text-red-800 md:bg-green-100 md:text-green-800">
                        In-progress
                      </div>
                    </div>
                    <div className="flex flex-col border-r border-[#CEDEE1] px-2">
                      <div className="flex flex-row">
                        <h2>Priority</h2>
                        <IoIosArrowDown className="py-1" size={21} />
                      </div>

                      <div className="flex flex-row">
                        {" "}
                        <MdSignalCellularAlt className="my-1" />
                        <h2 className="mx-1">High</h2>
                      </div>
                    </div>
                    <div className="flex flex-col border-r border-[#CEDEE1] px-2">
                      <div className="flex flex-row">
                        <h2>Target Date</h2>
                        <IoIosArrowDown className="py-1" size={21} />
                      </div>
                      <h2 className="font-normal">March 1, 2025</h2>
                    </div>
                    <div className="flex flex-col border-r border-[#CEDEE1] px-2">
                      <div className="flex flex-row">
                        <h2>Date Created</h2>
                        <IoIosArrowDown className="py-1" size={21} />
                      </div>
                      <h2 className="font-normal">March 1, 2025</h2>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isItemOpen(index) ? "h-full" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 py-3 pl-12 text-gray-600 border-[#CEDEE1] border-t">
                      {item.content}
                    </div>
                  </div>
                </div>
                {/* down */}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <FaClipboardList size={22} />
          <span>Pre-requisite</span>
        </div>
      ),
      content: (
        <div className="p-4">
          <h2 className=""> TBA</h2>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <HiPencilAlt size={22} />
          <span>Notes</span>
        </div>
      ),
      content: (
        <div className="p-4">
          <h2 className=""> TBA</h2>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <HiRefresh size={22} />
          <span>Updates</span>
        </div>
      ),
      content: (
        <div className="p-4">
          <h2 className=""> TBA</h2>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Workflow", goto: "/workflow" }]} />

      <DataProvider>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center border rounded-lg p-4 border-[#CEDEE1]">
                  <div className="">
                    {/* workflow title */}
                    <Typography variant="small" className="font-bold text-xl">
                      Incorporation
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-sm flex flex-row items-center"
                    >
                      <div className="flex flex-col pr-4 border-r border-[#CEDEE1]">
                        <div className="flex flex-row">
                          {" "}
                          <p className="text-md font-medium">Assignee</p>
                          <IoIosArrowDown className="my-1 ml-1" />
                        </div>

                        <p>N/A</p>
                      </div>
                      <div className="flex flex-col px-4 border-r border-[#CEDEE1]">
                        <div className="flex flex-row">
                          {" "}
                          <p className="text-md font-medium">Remarks</p>
                          <IoIosArrowDown className="my-1 ml-1" />
                        </div>

                        <p>N/A</p>
                      </div>
                      <div className="flex flex-col px-4 border-r border-[#CEDEE1]">
                        <div className="flex flex-row">
                          {" "}
                          <p className="text-md font-medium">Open</p>
                          <IoIosArrowDown className="my-1 ml-1" />
                        </div>

                        <p>N/A</p>
                      </div>
                      <div className="flex flex-col px-4 border-r border-[#CEDEE1]">
                        <div className="flex flex-row">
                          {" "}
                          <p className="text-md font-medium">Closed </p>
                          <IoIosArrowDown className="my-1 ml-1" />
                        </div>

                        <p>N/A</p>
                      </div>
                    </Typography>
                  </div>
                  <div>
                    <Typography>Fullsuite</Typography>
                  </div>
                </div>
                <div className="w-full mx-auto">
                  {/* Tab Navigation */}
                  <div className="flex">
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

                <div className="flex-1 h-full">
                  <div>
                    {/* <TableComponent
                      columns={columns}
                      data={users}
                      onClick={navigateToUser}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DataProvider>
    </div>
  );
};

export default ViewWorkflow;
