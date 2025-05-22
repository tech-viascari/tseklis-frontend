import { Typography } from "@material-tailwind/react";
import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { emptyIconSVG } from "./GetIcons";

const TaskTableComponent = ({
  columns,
  data,
  onClick = (row, index) => {},
}) => {
  createTheme("customized", {
    text: {
      primary: "#000000",
    },
    background: {
      default: "transparent",
    },
    divider: {
      default: "#d9d9d9",
    },
  });

  const customStyles = {
    headCells: {
      style: {
        font: "bold",
      },
    },
    cells: {
      style: {
        font: "normal",
        // backgroundColor: "#000",
        padding: "10px",
      },
    },
  };

  return (
    <div className=" rounded-xl bg-white shadow-sm border border-light-gray">
      <DataTable
        columns={columns}
        data={data}
        // persistTableHead={true}
        customStyles={customStyles}
        theme="customized"
        // onRowClicked={onClick}
        pointerOnHover={true}
        onRowClicked={onClick}
        noDataComponent={
          <div className="w-full h-full flex flex-col items-center justify-center py-10">
            <div className="w-[30%] py-4">{emptyIconSVG}</div>
            <Typography variant="small" className="font-semibold text-md py-2">
              You're all caught up!
            </Typography>
            <Typography variant="small" className="font-normal text-sm">
              No tasks assigned to you right now.
            </Typography>
          </div>
        }
        highlightOnHover
      />
    </div>
  );
};

export default TaskTableComponent;
