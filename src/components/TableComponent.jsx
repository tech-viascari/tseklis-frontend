import { Typography } from "@material-tailwind/react";
import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

const TableComponent = ({ columns, data, onClick = (row, index) => {} }) => {
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

  const OldTable = (
    <div className="w-full border border-light-gray rounded-xl text-dark min-w-full overflow-x-auto">
      <table className="text-left w-full shadow-sm rounded-xl  min-w-[320px]">
        <thead className="border-b border-light-gray">
          <tr>
            {columns.length != 0 &&
              columns.map((row, index) => {
                return (
                  <th
                    className="py-4 px-5"
                    key={`tbl-row-head-${Date.now() + Math.random()}`}
                  >
                    <Typography variant="small" className="font-medium text-sm">
                      {row.name}
                    </Typography>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {data.length == 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-5">
                <Typography variant="small" className="font-normal text-sm">
                  No records found.
                </Typography>
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              return (
                <tr
                  className="hover:bg-light-gray cursor-pointer"
                  key={`tbl-row-data-${Date.now() + Math.random()}`}
                  onClick={() => {
                    onClick(row, index);
                  }}
                >
                  {columns.map((column, _index) => {
                    return (
                      <td
                        key={column.name}
                        className={`px-5 py-6 ${
                          index < data.length - 1 &&
                          "border-b border-light-gray"
                        }`}
                      >
                        {/* <Typography
                      variant="small"
                      className="font-normal text-sm text-dark"
                    >
                      {column.selector(row)}
                    </Typography> */}
                        {column.selector(row)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-2 rounded-xl bg-white shadow-sm border border-light-gray">
      <DataTable
        columns={columns}
        data={data}
        persistTableHead={true}
        customStyles={customStyles}
        theme="customized"
        // onRowClicked={onClick}
        pointerOnHover={true}
        onRowClicked={(row, index) => {
          console.log("clicked");
        }}
        noDataComponent={
          <Typography variant="small" className="font-normal text-sm py-5">
            No records found.
          </Typography>
        }
        highlightOnHover
      />
    </div>
  );
};

export default TableComponent;
