import React from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { Typography } from "@material-tailwind/react";
import TableComponent from "../../components/TableComponent";
import TopBar from "../layouts/TopBar";
import { useNavigate } from "react-router";
import { PiToggleRight } from "react-icons/pi";
import { HiPencilSquare } from "react-icons/hi2";
import useDrawerStore from "../../store/useDrawerStore";

export const EntityEnrollment = () => {
  const { open, setOpen } = useDrawerStore();
  const navigate = useNavigate();

  const toggle_status = <PiToggleRight size={30} color="#00D253" />
  const toggle_action = <HiPencilSquare size={30} color="#00D253" />

  const VGCcolumns = [
    {
      name: "",
      selector: (row) => row.company_logo,
    },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
    },
    {
      name: "SEC Registration Number",
      selector: (row) => row.sec_certificate,
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

  const VGCdata = [
    {
      company_logo: "Logo",
      company_name: "Cloudeats PH. Inc",
      sec_certificate: 2022060054609 - 86,
      status: toggle_status,
      action: toggle_action,
    },
    {
      company_logo: "Logo",
      company_name: "Offshore Concept BPO Services Inc.",
      sec_certificate: "CS201419616",
      status: toggle_status,
      action: toggle_action,
    },
  ];

  return (
    <div className="w-full relative">
      <TopBar
        items={[{ title: "Entity Enrollment", goto: "/entity-enrollment" }]}
      />

      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <div className="pt-[60px]">
          <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <Typography variant="small" className="font-bold text-xl">
                    Entity Enrollment
                  </Typography>
                  <Typography variant="small" className="font-normal text-sm">
                    Here's the list of companies across various categories.
                  </Typography>
                </div>
                <div>
                  <ButtonComponent
                    onClick={() => {
                      navigate("/entity-enrollment/add");
                    }}
                  >
                    Add new
                  </ButtonComponent>
                </div>
              </div>

              <Typography variant="small" className="font-semibold text-sm">
                Viascari Group of Companies
              </Typography>
              <hr className="border-black" />
              <div className="flex-1 h-full">
                <div>
                  <TableComponent
                    columns={VGCcolumns}
                    data={VGCdata}
                    onClick={(row) => {
                      console.log(row);
                    }}
                  />
                </div>
              </div>

              <Typography variant="small" className="font-semibold text-sm">
                Computershare Clients
              </Typography>
              <hr className="border-black" />
              <div className="flex-1 h-full">
                <div>
                  <TableComponent
                    columns={VGCcolumns}
                    data={VGCdata}
                    onClick={(row) => {
                      console.log(row);
                    }}
                  />
                </div>
              </div>

              <Typography variant="small" className="font-semibold text-sm">
                External Clients
              </Typography>
              <hr className="border-black" />
              <div className="flex-1 h-full">
                <div>
                  <TableComponent
                    columns={VGCcolumns}
                    data={VGCdata}
                    onClick={(row) => {
                      console.log(row);
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityEnrollment;
