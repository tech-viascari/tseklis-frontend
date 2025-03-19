import React, { useEffect } from "react";
import TopBar from "../../layouts/TopBar";
import { Typography } from "@material-tailwind/react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useNavigate, useParams } from "react-router";
import useLegalEntities from "../../../store/useLegalEntities";
import DataProvider from "../../../providers/DataProvider";
import ButtonComponent from "../../../components/ButtonComponent";
import TableComponent from "../../../components/TableComponent";
import useGISDocumentStore from "../../../store/useGISDocumentStore";
import { formattedDate } from "../../../utils/global";

const EntityGISPage = () => {
  const { entity_id } = useParams();

  const PATH = `/legal-entities/v/${entity_id}/gis-tracker`;

  const { open, setOpen } = useDrawerStore();

  const { states, entity } = useLegalEntities();

  const { GISDocuments, setGISDocuments, setGISDocument } =
    useGISDocumentStore();

  const navigate = useNavigate();

  const columns = [
    {
      name: "GIS Name",
      selector: (row) => row.gis_document_name,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.gis_document_name}
          </Typography>
        );
      },
    },
    {
      name: "Date Received",
      selector: (row) => row.date_received,
      cell: (row) => {
        if (row.date_received == null) return;
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.date_received}
          </Typography>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => row.timestamps[0].status,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.timestamps[0].status}
          </Typography>
        );
      },
    },
    {
      name: "Type of Meeting",
      selector: (row) =>
        row.document_data.is_special_meeting ? "Special" : "Annual",
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {row.document_data.is_special_meeting ? "Special" : "Annual"}
          </Typography>
        );
      },
    },
    {
      name: "Last Modified",
      selector: (row) => row.timestamps[0].datetime,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => navigateToGISPage(row)}
          >
            {formattedDate(row.timestamps[0].datetime)}
          </Typography>
        );
      },
    },
  ];

  const navigateToGISPage = (row) => {
    navigate(`${PATH}/${row.gis_document_id}`);
    setGISDocument(row);
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

      <DataProvider
        tableName={`/legal-entities/${entity_id}/gis-tracker`}
        setData={setGISDocuments}
      >
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
                      data={GISDocuments}
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
