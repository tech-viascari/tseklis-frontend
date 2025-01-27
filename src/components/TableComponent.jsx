import { Typography } from "@material-tailwind/react";
import React from "react";

const TableComponent = ({ columns, data, onClick = () => {} }) => {
  return (
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
                    <Typography
                      variant="small"
                      className="font-medium text-sm"
                    >
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
                    onClick(row);
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
                        <Typography
                          variant="small"
                          className="font-normal text-sm text-dark"
                        >
                          {column.selector(row)}
                        </Typography>
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
};

export default TableComponent;
