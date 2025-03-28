import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";

const TablePaginateComponent = ({
  columns,
  data,
  onClick = () => {},
  fetch,
  perPage,
  totalRecords,
  loading,
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
        padding: "10px",
      },
    },
  };

  return (
    <div className=" rounded-xl bg-white shadow-sm border border-light-gray">
      <DataTable
        columns={columns}
        data={data}
        persistTableHead={true}
        customStyles={customStyles}
        theme="customized"
        // onRowClicked={onClick}
        pointerOnHover={true}
        onRowClicked={onClick}
        noDataComponent={
          <Typography variant="small" className="font-normal text-sm py-5">
            No records found.
          </Typography>
        }
        highlightOnHover
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRecords}
        onChangeRowsPerPage={(newPerPage, page) => {
          fetch(page, newPerPage);
        }}
        onChangePage={(page) => {
          fetch(page, perPage);
        }}
        progressComponent={
          <Typography variant="small" className="font-normal text-sm py-5">
            Loading...
          </Typography>
        }
      />
    </div>
  );
};

export default TablePaginateComponent;
