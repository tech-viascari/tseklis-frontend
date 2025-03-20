import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Avatar, Typography } from "@material-tailwind/react";
import useDrawerStore from "../../store/useDrawerStore";
import TopBar from "../layouts/TopBar";
import DataProvider from "../../providers/DataProvider";
import ButtonComponent from "../../components/ButtonComponent";
import TableComponent from "../../components/TableComponent";
import { PiToggleRight } from "react-icons/pi";
import { HiPencilSquare } from "react-icons/hi2";
import useLegalEntities from "../../store/useLegalEntities";

const LegalEntitiesPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  const {
    states,
    viascari_group_of_companies,
    computershare_clients,
    external_clients,
    filterEntities,
    setEntity,
  } = useLegalEntities();

  const navigateToEntity = (row) => {
    setEntity(row);
    navigate(`/legal-entities/v/${row.entity_id}`);
  };

  const navigateToUpdateEntity = (row) => {
    setEntity(row);
    navigate(`/legal-entities/update/${row.entity_id}`);
  };

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.entity_details.company_name,
      cell: (row) => {
        return (
          <div
            className="flex flex-row gap-5 w-full items-center justify-center"
            onClick={() => {
              navigateToEntity(row);
            }}
          >
            <div className="w-20 aspect-square flex flex-col items-center justify-center">
              <Avatar
                src={row.entity_logo}
                alt="avatar"
                className="object-contain"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                className="font-normal text-sm text-dark line-clamp-1"
              >
                {row.entity_details.company_name}
              </Typography>
            </div>
          </div>
        );
      },
      width: "50%",
    },
    {
      name: "SEC Registration Number",
      selector: (row) => row.entity_details.sec_registration_number,
      cell: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
            onClick={() => {
              navigateToEntity(row);
            }}
          >
            {row.entity_details.sec_registration_number}
          </Typography>
        );
      },
      width: "30%",
    },

    {
      name: "Status",
      selector: (row) => (
        <PiToggleRight
          size={25}
          className="text-primary"
          onClick={() => {
            console.log("Toggle status");
          }}
        />
      ),
      width: "10%",
    },

    {
      name: "Action",
      selector: (row) => row.entity_id,
      cell: (row) => {
        return (
          <HiPencilSquare
            size={25}
            className="text-primary"
            onClick={() => {
              navigateToUpdateEntity(row);
            }}
          />
        );
      },
      width: "30%",
    },
  ];


  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Legal Entities", goto: "/legal-entities" }]} />

      <DataProvider tableName="/legal-entities" setData={filterEntities}>
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Legal Entities
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of companies across various categories.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate("/legal-entities/add-new");
                      }}
                    >
                      Add new
                    </ButtonComponent>
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div className="flex flex-col gap-7 h-full pb-5">
                    <div className="flex flex-col gap-3">
                      <Typography
                        variant="small"
                        className="font-semibold text-sm"
                      >
                        Viascari Group of Companies
                      </Typography>
                      <TableComponent
                        columns={columns}
                        data={viascari_group_of_companies}
                        onClick={(row) => {
                          navigateToEntity(row);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Typography
                        variant="small"
                        className="font-semibold text-sm"
                      >
                        Computershare Clients
                      </Typography>
                      <TableComponent
                        columns={columns}
                        data={computershare_clients}
                        onClick={(row) => {
                          navigateToEntity(row);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Typography
                        variant="small"
                        className="font-semibold text-sm"
                      >
                        External Clients
                      </Typography>
                      <TableComponent
                        columns={columns}
                        data={external_clients}
                        onClick={(row) => {
                          navigateToEntity(row);
                        }}
                      />
                    </div>
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

export default LegalEntitiesPage;
