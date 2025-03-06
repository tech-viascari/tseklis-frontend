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

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.entity_details.company_name,
      cell: (row) => {
        console.log(row);

        return (
          <div
            className="flex flex-row gap-5 w-full items-center justify-center"
            onClick={() => {
              navigateToEntity(row);
            }}
          >
            <div className="w-20 aspect-square flex flex-col items-center justify-center">
              {/* <Avatar
                src={row.company_logo}
                alt="avatar"
                className="object-contain"
              /> */}
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
      selector: (row) => (
        <HiPencilSquare
          size={25}
          className="text-primary"
          onClick={() => {
            console.log("Toggle Action");
          }}
        />
      ),
      width: "10%",
    },
  ];

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const data = [
    {
      ...states.entity,
      entity_id: generateUUID(),
      company_name: "Cloudeats PH Inc.",
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1720151475/CoMS/Companies/Logos/CloudEats%20Ph%2C%20Inc..png",
      sec_registration_number: "2022060054609 - 86",
      client_type: "Viascari Group of Companies",
    },
    {
      ...states.entity,
      entity_id: generateUUID(),
      company_name: "Offshore Concept BPO Services Inc.",
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1715325752/CoMS/Companies/Logos/Offshore%20Concept%20BPO%20Services%20Inc..png",
      sec_registration_number: "CS201419616",
      client_type: "Viascari Group of Companies",
    },
    {
      ...states.entity,
      entity_id: generateUUID(),
      company_name:
        "Equinix (Philippines) Services Inc. (formerly known as Packethost Inc.)",
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1729152589/CoMS/Companies/Logos/Equinix%20%28Philippines%29%20Services%20Inc.%20%28formerly%20known%20as%20Packethost%20Inc.%29.png",
      sec_registration_number: "CS201901415",
      client_type: "Computershare Clients",
    },
    {
      ...states.entity,
      entity_id: generateUUID(),
      company_name: "Booking.com Philippines, Inc.",
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1720148187/CoMS/Companies/Logos/Booking.com%20Philippines%2C%20Inc..svg",
      sec_registration_number: "CS201203871",
      client_type: "Computershare Clients",
    },
    {
      ...states.entity,
      entity_id: generateUUID(),
      company_name: "Twitter Philippines Inc.",
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1721120580/CoMS/Companies/Logos/Twitter%20Philippines%20Inc..png",
      sec_registration_number: "CS201716724",
      client_type: "Computershare Clients",
    },
    {
      ...states.entity,
      entity_id: generateUUID(),
      company_name: "Utakpos",
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1735893034/CoMS/Companies/Logos/Utakpos.png",
      sec_registration_number: "CS201812157",
      client_type: "External Clients",
    },
  ];

  // useEffect(() => {
  //   filterEntities(data);
  // }, []);

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
