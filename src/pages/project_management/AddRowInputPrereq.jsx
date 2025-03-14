import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const FileLinksTable = ({ rows = [], setRows }) => {
  const [newRow, setNewRow] = useState({
    file: "",
    link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addRow = () => {
    // Validate that at least one field has data
    if (newRow.file.trim() !== "" || newRow.link.trim() !== "") {
      const newId =
        rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
      setRows([...rows, { id: newId, ...newRow }]);
      setNewRow({ file: "", link: "" });
    }
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="w-full mx-auto border border-[#CEDEE1] rounded-lg">
      <table className="min-w-full divide-y divide-[#CEDEE1]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#CEDEE1]">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-3">{row.file}</td>
              <td className="px-6 py-3">
                <a
                  href={row.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.link}
                </a>
              </td>
              <td className="px-6 py-3">
                <button
                  onClick={() => removeRow(row.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                >
                  <FaRegTrashAlt size={16} />
                </button>
              </td>
            </tr>
          ))}

          {/* Add new row */}
          <tr className="bg-gray-50">
            <td className="px-6 py-3">
              <input
                type="text"
                name="file"
                value={newRow.file}
                onChange={handleInputChange}
                placeholder="Enter file name"
                className="w-full px-3 py-2 border border-[#CEDEE1] rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </td>
            <td className="px-6 py-3">
              <input
                type="text"
                name="link"
                value={newRow.link}
                onChange={handleInputChange}
                placeholder="Enter file link"
                className="w-full px-3 py-2 border border-[#CEDEE1] rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </td>
            <td className="px-6 py-3">
              <button
                onClick={addRow}
                className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full"
              >
                <FaPlus size={16} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FileLinksTable;
