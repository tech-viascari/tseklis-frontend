import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Typography } from "@material-tailwind/react";
import useQuoteStore from "../../store/useQuoteStore";
import useDrawerStore from "../../store/useDrawerStore";
import TopBar from "../layouts/TopBar";
import DataProvider from "../../providers/DataProvider";
import ButtonComponent from "../../components/ButtonComponent";
import TableComponent from "../../components/TableComponent";
import useAuthStore from "../../store/useAuthStore";
import PageDeniedComponent from "../../components/PageDeniedComponent";

const QuotesPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { quotes, setQuote, setQuotes } = useQuoteStore();

  const { user, hasPermission } = useAuthStore();

  const columns = [
    {
      name: "Quote Number",
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
      name: "Company Name",
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
      name: "Quote Name",
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
  ];

  const navigateToQuote = (row) => {
    navigate("/quotes/view/" + row.quote_id);
    setQuote(row);
  };

  if (!hasPermission(user, "Add Quotes")) {
    return (
      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <PageDeniedComponent />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Quotes", goto: "/quotes" }]} />

      <DataProvider tableName="/quotes" setData={setQuotes}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Quotes
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of quotes.
                    </Typography>
                  </div>
                  <div>
                    {hasPermission(user, "Add Quotes") && (
                      <ButtonComponent
                        onClick={() => {
                          navigate("/quotes/add-new");
                        }}
                      >
                        Add new
                      </ButtonComponent>
                    )}
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div>
                    <TableComponent
                      columns={columns}
                      data={quotes}
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

export default QuotesPage;
