import React from "react";
import TopBar from "../../layouts/TopBar";
import { Typography } from "@material-tailwind/react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useNavigate, useParams } from "react-router";
import useLegalEntities from "../../../store/useLegalEntities";
import DataProvider from "../../../providers/DataProvider";
import ButtonComponent from "../../../components/ButtonComponent";
import TableComponent from "../../../components/TableComponent";

const EntityDocumentDraftingPage = () => {
  const { open, setOpen } = useDrawerStore();
  const { entity_id } = useParams();
  const { states, entity } = useLegalEntities();

  const navigate = useNavigate();

  const columns = [
    {
      name: "Document Name",
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
      name: "Last Modified",
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
  ];

  const navigateToDocumentDrafting = (row) => {
    navigate("/quotes/view/" + row.quote_id);
    setQuote(row);
  };

  return (
    <>
      <TopBar
        items={[
          {
            title: entity.entity_details.company_name,
            goto: `/legal-entities/v/${entity_id}/`,
          },
          {
            title: "Document Drafting",
            goto: `/legal-entities/v/${entity_id}/document-drafting`,
          },
        ]}
      />

      <DataProvider tableName="/quotes" setData={() => {}}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Document Drafting
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of drafted documents.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate(
                          `/legal-entities/v/${entity_id}/document-drafting/add-new`
                        );
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
                      data={[]}
                      onClick={navigateToDocumentDrafting}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DataProvider>
    </>
  );
};

export default EntityDocumentDraftingPage;
