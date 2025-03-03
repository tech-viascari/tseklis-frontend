import React from "react";
import { useNavigate } from "react-router";
import { Avatar, Typography } from "@material-tailwind/react";
import useQuoteStore from "../../store/useQuoteStore";
import useDrawerStore from "../../store/useDrawerStore";
import TopBar from "../layouts/TopBar";
import DataProvider from "../../providers/DataProvider";
import ButtonComponent from "../../components/ButtonComponent";
import TableComponent from "../../components/TableComponent";
import { PiToggleRight } from "react-icons/pi";
import { HiPencilSquare } from "react-icons/hi2";

const LegalEntitiesPage = () => {
  const { open, setOpen } = useDrawerStore();

  const navigate = useNavigate();
  // const { setQuote, setQuotes } = useQuoteStore();

  const toggle_status = <PiToggleRight size={30} color="#00D253" />;
  const toggle_action = <HiPencilSquare size={30} color="#00D253" />;

  const columns = [
    {
      name: "SEC Registration Number",
      selector: (row) => {
        return (
          <Typography
            variant="small"
            className="font-normal text-sm text-dark"
          >
            {row.sec_certificate}
          </Typography>
        );
      },
    },
    {
      name: "Company Name",
      selector: (row) => {
        return (
          <div className="flex flex-row gap-3 w-full items-center">
            <div className="w-20 aspect-square flex flex-col items-center justify-center">
              {/* <img
                className="w-20 object-contain bg-transparent"
                src={row.company_logo}
                alt=""
              /> */}
              <Avatar
                src={row.company_logo}
                alt="avatar"
                className="object-contain"
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                className="font-normal text-sm text-dark line-clamp-1"
              >
                {row.company_name}
              </Typography>
            </div>
          </div>
        );
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const VGCClients = [
    {
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1720151475/CoMS/Companies/Logos/CloudEats%20Ph%2C%20Inc..png",
      company_name: "Cloudeats PH. Inc",
      sec_certificate: 2022060054609 - 86,
      status: toggle_status,
      action: toggle_action,
    },
    {
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1715325752/CoMS/Companies/Logos/Offshore%20Concept%20BPO%20Services%20Inc..png",
      company_name: "Offshore Concept BPO Services Inc.",
      sec_certificate: "CS201419616",
      status: toggle_status,
      action: toggle_action,
    },
  ];

  const computerShareClients = [
    {
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1729152589/CoMS/Companies/Logos/Equinix%20%28Philippines%29%20Services%20Inc.%20%28formerly%20known%20as%20Packethost%20Inc.%29.png",
      company_name:
        "Equinix (Philippines) Services Inc. (formerly known as Packethost Inc.)",
      sec_certificate: "CS201901415",
      status: toggle_status,
      action: toggle_action,
    },
    {
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1720148187/CoMS/Companies/Logos/Booking.com%20Philippines%2C%20Inc..svg",
      company_name: "Booking.com Philippines, Inc.",
      sec_certificate: "CS201203871",
      status: toggle_status,
      action: toggle_action,
    },
    {
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1721120580/CoMS/Companies/Logos/Twitter%20Philippines%20Inc..png",
      company_name: "Twitter Philippines Inc.",
      sec_certificate: "CS201716724",
      status: toggle_status,
      action: toggle_action,
    },
  ];

  const externalClients = [
    {
      company_logo:
        "https://res.cloudinary.com/dmhaxgniu/image/upload/v1735893034/CoMS/Companies/Logos/Utakpos.png",
      company_name: "Utakpos",
      sec_certificate: "CS201812157",
      status: toggle_status,
      action: toggle_action,
    },
  ];

  return (
    <div className="w-full relative">
      <TopBar items={[{ title: "Legal Entities", goto: "/legal-entities" }]} />

      <DataProvider tableName="/quotes" setData={() => {}}>
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
                  <div className="flex flex-col gap-5 h-full">
                    <Typography
                      variant="small"
                      className="font-semibold text-sm"
                    >
                      Viascari Group of Companies
                    </Typography>
                    <hr className="border-light-gray" />
                    <TableComponent
                      columns={columns}
                      data={VGCClients}
                      onClick={(row) => {
                        navigate(`/legal-entities/v/1`);
                      }}
                    />
                    <Typography
                      variant="small"
                      className="font-semibold text-sm"
                    >
                      Computershare Clients
                    </Typography>
                    <hr className="border-light-gray" />
                    <TableComponent
                      columns={columns}
                      data={computerShareClients}
                      onClick={(row) => {
                        navigate(`/legal-entities/v/1`);
                      }}
                    />
                    <Typography
                      variant="small"
                      className="font-semibold text-sm"
                    >
                      External Clients
                    </Typography>
                    <hr className="border-light-gray" />
                    <TableComponent
                      columns={columns}
                      data={externalClients}
                      onClick={(row) => {
                        navigate(`/legal-entities/v/1`);
                      }}
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

export default LegalEntitiesPage;
