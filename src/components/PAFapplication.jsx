import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Checkbox } from "@material-tailwind/react";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const AccordionContent = () => {
  const [newName, setNewName] = useState("");

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Recieved Digital COI and Original COI (15days)",
      email: "john@example.com",
      role: "",
      status: "Not Started",
    },
    {
      id: 2,
      name: "Application of Stock and Transfer Book",
      email: "jane@example.com",
      role: "",
      status: "Not Started",
    },
    {
      id: 3,
      name: "PAF printing",
      email: "mike@example.com",
      role: "",
      status: "Not Started",
    },
    {
      id: 4,
      name: "PAF Payment",
      email: "mike@example.com",
      role: "",
      status: "Not Started",
    },
  ]);

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
          role: "",
          status: "Pending",
        },
      ]);
      setNewName("");
    }
  };

  return (
    <div className="overflow-x-auto border-2 border-[#CEDEE1] rounded-lg">
      <table className="min-w-full divide-y divide-[#CEDEE1]">
        <thead className="bg-gray-50 ">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-[#CEDEE1]">
              Subtask
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-[#CEDEE1]">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-[#CEDEE1]">
              Remarks
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#CEDEE1]">
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap border-r border-[#CEDEE1]">
                <Checkbox label={row.name} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r border-[#CEDEE1]">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : row.status === "Pending"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r border-[#CEDEE1]">
                {row.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex flex-row">
                <MdAccessTimeFilled className="mx-2" size={20} />
                <FaFileAlt className="mx-2" size={20} />
                <FaPencilAlt className="mx-2" size={20} />
                <FaTrash className="mx-2" size={20} />
              </td>
            </tr>
          ))}

          {/* Add new row - Name input only */}
          <tr className="bg-gray-50 hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap border-r border-[#CEDEE1]">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newName}
                  onChange={handleInputChange}
                  placeholder="Enter new subtask"
                  className="block w-full px-3 py-1 text-sm border border-[#CEDEE1] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={addNewRow}
                  className="ml-2 p-1 rounded-full text-blue-600 hover:bg-blue-100"
                >
                  <FaPlus size={18} />
                </button>
              </div>
            </td>
            <td
              colSpan="3"
              className="px-6 py-4 whitespace-nowrap text-gray-500 italic"
            >
              New row will be added with default values
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccordionContent;
