import React, { useEffect } from "react";
import TopBar from "../layouts/TopBar";
import ButtonComponent from "../../components/ButtonComponent";
import TableComponent from "../../components/TableComponent";
import { useNavigate } from "react-router";
import useDrawerStore from "../../store/useDrawerStore";
import { Typography } from "@material-tailwind/react";
import useQuoteStore from "../../store/useQuoteStore";
import QuotesProvider from "../../providers/QuotesProvider";

const QuotesPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const { quotes, setQuote } = useQuoteStore();

  const columns = [
    {
      name: "Quote Number",
      selector: (row) => row.quote_number,
    },
    {
      name: "Company Name",
      selector: (row) => row.form_data.recipient_company,
    },
    {
      name: "Quote Name",
      selector: (row) => row.quote_name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Quotes", goto: "/quotes" }]} />

      <QuotesProvider>
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
                    <ButtonComponent
                      onClick={() => {
                        navigate("/quotes/add-new");
                      }}
                    >
                      Add new
                    </ButtonComponent>
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div>
                    <TableComponent
                      columns={columns}
                      data={quotes}
                      onClick={(row) => {
                        navigate("/quotes/view/" + row.quote_id);
                        setQuote(row);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QuotesProvider>
    </div>
  );
};

export default QuotesPage;
