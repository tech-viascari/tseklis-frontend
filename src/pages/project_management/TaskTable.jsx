import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTask = () => {
    // Validate that at least task name is provided
    if (newTask.name.trim() !== "") {
      const newId =
        tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
      setTasks((prev) => [...prev, { id: newId, ...newTask }]);
      setNewTask({ name: "", priority: "", date: "" });
    }
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full mx-auto border border-[#CEDEE1] rounded-lg">
      <table className="min-w-full divide-y divide-[#CEDEE1]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Target Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#CEDEE1]">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{task.name}</td>
              <td className="px-6 py-4">
                {task.priority && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">{formatDate(task.date)}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                >
                  <FaRegTrashAlt size={16} />
                </button>
              </td>
            </tr>
          ))}

          {/* Add new task row */}
          <tr className="bg-gray-50">
            <td className="px-6 py-3">
              <input
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
                placeholder="Enter task name"
                className="w-full px-3 py-2 border border-[#CEDEE1] rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </td>
            <td className="px-6 py-3">
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#CEDEE1] rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Priority Level</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </td>
            <td className="px-6 py-3">
              <input
                type="date"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#CEDEE1] rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </td>
            <td className="px-6 py-3">
              <button
                onClick={addTask}
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

export default TaskTable;
