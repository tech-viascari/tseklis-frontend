import React from "react";
import TopBar from "../../layouts/TopBar";
import { Typography } from "@material-tailwind/react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useNavigate, useParams } from "react-router";
import useLegalEntities from "../../../store/useLegalEntities";
import DataProvider from "../../../providers/DataProvider";
import ButtonComponent from "../../../components/ButtonComponent";
import TableComponent from "../../../components/TableComponent";

const EntityGISPage = () => {
  const { entity_id } = useParams();

  const PATH = `/legal-entities/v/${entity_id}/gis-tracker`;

  const { open, setOpen } = useDrawerStore();

  const { states, entity } = useLegalEntities();

  const navigate = useNavigate();

  const columns = [
    {
      name: "GIS Name",
      selector: (row) => row.quote_number,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.quote_number}
          </Typography>
        );
      },
    },
    {
      name: "Date Received",
      selector: (row) => row.form_data.recipient_company,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.form_data.recipient_company}
          </Typography>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => row.quote_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.quote_name}
          </Typography>
        );
      },
    },
    {
      name: "Type of Meeting",
      selector: (row) => row.quote_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.quote_name}
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
            onClick={() => navigateToGISPage(row)}
          >
            {row.quote_name}
          </Typography>
        );
      },
    },
  ];

  const navigateToGISPage = (row) => {
    navigate(PATH);
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
            title: "GIS Tracker",
            goto: `/legal-entities/v/${entity_id}/gis-tracker`,
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
                      GIS Tracker
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of GIS documents.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate(
                          `/legal-entities/v/${entity_id}/gis-tracker/add-new`
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
                      onClick={navigateToGISPage}
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

export default EntityGISPage;
