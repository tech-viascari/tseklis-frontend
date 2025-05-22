import React, { useEffect } from "react";
import TopBar from "../layouts/TopBar";
import PageDeniedComponent from "../../components/PageDeniedComponent";
import useDrawerStore from "../../store/useDrawerStore";
import { useNavigate } from "react-router";
import useQuoteStore from "../../store/useQuoteStore";
import useAuthStore from "../../store/useAuthStore";
import { Typography } from "@material-tailwind/react";
import DataProvider from "../../providers/DataProvider";
import TableComponent from "../../components/TableComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { setDocumentTitle } from "../../utils/global";
import TaskTableComponent from "../../components/TaskTableComponent";

const AssignedProjectsPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { quotes, setQuote, setQuotes } = useQuoteStore();

  const { user, hasPermission } = useAuthStore();

  const data = [

  ];

  const columns = [
    {
      name: "Task Name",
      selector: (row) => row.quote_number,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.quote_number}
          </Typography>
        );
      },
    },

    {
      name: "Assignee",
      selector: (row) => row.quote_number,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.quote_number}
          </Typography>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => {
        return row.timestamps.length != 0 ? row.timestamps[0].status : "";
      },
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.timestamps.length != 0 && row.timestamps[0].status}
          </Typography>
        );
      },
    },
    {
      name: "Start Date",
      selector: (row) => row.form_data.recipient_company,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.form_data.recipient_company}
          </Typography>
        );
      },
    },
    {
      name: "Target Due Date",
      selector: (row) => row.quote_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.quote_name}
          </Typography>
        );
      },
    },
    {
      name: "Pending Action From",
      selector: (row) => {
        return row.timestamps.length != 0 ? row.timestamps[0].status : "";
      },
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.timestamps.length != 0 && row.timestamps[0].status}
          </Typography>
        );
      },
    },
    {
      name: "Date Completed",
      selector: (row) => {
        return row.timestamps.length != 0 ? row.timestamps[0].status : "";
      },
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.timestamps.length != 0 && row.timestamps[0].status}
          </Typography>
        );
      },
    },
    {
      name: "Google Project Folder",
      selector: (row) => {
        return row.timestamps.length != 0 ? row.timestamps[0].status : "";
      },
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.timestamps.length != 0 && row.timestamps[0].status}
          </Typography>
        );
      },
    },
    {
      name: "Executed Documents",
      selector: (row) => {
        return row.timestamps.length != 0 ? row.timestamps[0].status : "";
      },
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToQuote(row)}
          >
            {row.timestamps.length != 0 && row.timestamps[0].status}
          </Typography>
        );
      },
    },
  ];

  const navigateToQuote = (row) => {
    navigate("/quotes/view/" + row.quote_id);
    setQuote(row);
  };

  // if (!hasPermission(user, "Add Quotes")) {
  //   return (
  //     <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
  //       <PageDeniedComponent />
  //     </div>
  //   );
  // }

  useEffect(() => {
    setDocumentTitle("Projects");
  }, []);

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Projects", goto: "/quotes" }]} />

      <DataProvider tableName="/quotes" setData={setQuotes}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Assigned to you
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the overview of your assigned tasks.
                    </Typography>
                  </div>
                  <div>
                    {/* {hasPermission(user, "Add Quotes") && (
                      <ButtonComponent
                        onClick={() => {
                          navigate("/quotes/add-new");
                        }}
                      >
                        Add new
                      </ButtonComponent>
                    )} */}
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div>
                    <TaskTableComponent
                      columns={columns}
                      data={data}
                      onClick={navigateToQuote}
                    />
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

export default AssignedProjectsPage;
