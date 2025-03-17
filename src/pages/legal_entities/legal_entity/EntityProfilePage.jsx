import React, { useEffect, useState } from "react";
import TopBar from "../../layouts/TopBar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  dialog,
  Typography,
} from "@material-tailwind/react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useParams } from "react-router";
import useLegalEntities from "../../../store/useLegalEntities";
import { use } from "react";
import ReviewComponent from "../../../components/ReviewComponent";
import { HiArrowSmallRight, HiMiniExclamationCircle } from "react-icons/hi2";
import TableComponent from "../../../components/TableComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import ViewPageComponent from "../../../components/ViewPageComponent";
import DialogComponent from "../../../components/DialogComponent";
import { PiFoldersFill } from "react-icons/pi";
import UnderConstructionComponent from "../../../components/UnderConstructionComponent";

const EntityProfilePage = () => {
  const { entity_id } = useParams();
  const { entity } = useLegalEntities();
  useEffect(() => {
    console.log(entity);
  }, [entity]);

  const DisplayOfficersTable = () => {
    return (
      <>
        {entity.entity_details.officer_information.length == 0 ? (
          <>
            <div className="py-5 text-center justify-center items-center flex flex-col">
              <HiMiniExclamationCircle className="text-orange-500" size={25} />

              <Typography
                variant="small"
                className="text-center text-[15px] font-medium"
              >
                No officer added yet.
              </Typography>
            </div>
          </>
        ) : (
          <TableComponent
            columns={[
              {
                name: "Name",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.officer_name}
                  </Typography>
                ),
              },
              {
                name: "Address",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.current_residence}
                  </Typography>
                ),
              },
              {
                name: "Nationality",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.nationality}
                  </Typography>
                ),
              },
              {
                name: "Incorporator",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.incorporator}
                  </Typography>
                ),
              },
              {
                name: "Board",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.board}
                  </Typography>
                ),
              },
              {
                name: "Gender",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.gender}
                  </Typography>
                ),
              },
              {
                name: "Stock Holder",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.stockholder}
                  </Typography>
                ),
              },
              {
                name: "Officer",
                selector: (row) => (row.officer),
                cell: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.officer.toString().replace(/,/g, ", ")}
                  </Typography>
                ),
              },
              {
                name: "Exec. Comm.",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.executive_committee}
                  </Typography>
                ),
              },
              {
                name: "TIN",
                selector: (row) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                  >
                    {row.tax_identification_number}
                  </Typography>
                ),
              },
            ]}
            data={entity.entity_details.officer_information}
          />
        )}
      </>
    );
  };

  const [fileDialog, setFileDialog] = useState(false);
  const [selected, setSelected] = useState("");

  const handleFileDialog = (selected) => {
    setFileDialog(!fileDialog);
  };

  return (
    <>
      <ViewPageComponent
        items={[
          {
            title: entity.entity_details.company_name,
            goto: `/legal-entities/v/${entity_id}/`,
          },
          {
            title: "Entity Profile",
            goto: `/legal-entities/v/${entity_id}/entity-profile`,
          },
        ]}
        title={entity.entity_details.company_name}
        goBackTo="/legal-entities"
      >
        <div className="flex flex-col gap-5 h-full">
          <ReviewComponent
            title="Basic Information"
            data={[
              {
                name: "Business Type",
                value: entity.entity_details.business_type,
              },
              {
                name: "Client Type",
                value: entity.entity_details.client_type,
              },
              {
                name: "Company Address",
                value: entity.entity_details.company_address,
              },
              {
                name: "Type of Company",
                value: entity.entity_details.type_of_company,
              },
              {
                name: "Corporate TIN",
                value: entity.entity_details.corporate_tin,
              },
              {
                name: "SEC Registration Number",
                value: entity.entity_details.sec_registration_number,
              },
              {
                name: "Official Email",
                value: entity.entity_details.official_email,
              },
              {
                name: "Alternative Email",
                value: entity.entity_details.alternative_email,
              },
              {
                name: "Official Contact Number",
                value: entity.entity_details.official_contact_number,
              },
              {
                name: "Alternative Contact Number",
                value: entity.entity_details.alternative_contact_number,
              },
            ]}
          />

          <div>
            <Typography variant="small" className="font-semibold text-sm">
              Officer Information
            </Typography>
            <hr className="border-light-gray my-3" />
            <DisplayOfficersTable />
          </div>

          <div>
            <Typography variant="small" className="font-semibold text-sm">
              Files
            </Typography>
            <hr className="border-light-gray my-3" />

            <div className="grid sm:grid-cols-3 sm:grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 gap-4">
              <div
                className="mt-6 w-50 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer"
                onClick={() => {
                  handleFileDialog();
                  setSelected("SEC Certificate");
                }}
              >
                <CardBody className="bg-white size-full flex justify-center items-center">
                  <PiFoldersFill size={50} />
                </CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-center size-full"
                >
                  SEC Certificate
                </Typography>
              </div>

              <div
                className="mt-6 w-50 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer"
                onClick={() => {
                  handleFileDialog();
                  setSelected("Article of Incorporation");
                }}
              >
                <CardBody className="size-full flex justify-center items-center">
                  <PiFoldersFill size={50} />
                </CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-center size-full"
                >
                  Articles of Incorporation
                </Typography>
              </div>

              <div
                className="mt-6 w-50 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer"
                onClick={() => {
                  handleFileDialog();
                  setSelected("By Laws");
                }}
              >
                <CardBody className="size-full flex justify-center items-center">
                  <PiFoldersFill size={50} />
                </CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-center size-full"
                >
                  By Laws
                </Typography>
              </div>

              <div
                className="mt-6 w-50 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer"
                onClick={() => {
                  handleFileDialog();
                  setSelected("BIR/COR");
                }}
              >
                <CardBody className="size-full flex justify-center items-center">
                  <PiFoldersFill size={50} />
                </CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-center size-full"
                >
                  BIR/COR
                </Typography>
              </div>

              <div
                className="mt-6 w-50 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer"
                onClick={() => {
                  handleFileDialog();
                  setSelected("LGU Business Permit");
                }}
              >
                <CardBody className="size-full flex justify-center items-center">
                  <PiFoldersFill size={50} />
                </CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-center size-full"
                >
                  LGU Business Permit
                </Typography>
              </div>

              <div
                className="mt-6 w-50 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer"
                onClick={() => {
                  handleFileDialog();
                  setSelected("MC28 Form");
                }}
              >
                <CardBody className="size-full flex justify-center items-center">
                  <PiFoldersFill size={50} />
                </CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold text-center size-full"
                >
                  MC28 Form
                </Typography>
              </div>

            </div>
          </div>
        </div>
      </ViewPageComponent>

      <DialogComponent
        dialogName={fileDialog}
        handlerDialog={handleFileDialog}
        title={selected}
        size="xl"
        hideFooter={true}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <UnderConstructionComponent />
            {/* <ButtonComponent
              variant="outlined"
              className="bg-transparent text-gray border-gray hover:text-primary  hover:border-primary"
            >
              <div className="flex flex-row gap-1 items-center">
                Download
                <HiArrowSmallRight size={15} />
              </div>
            </ButtonComponent> */}
          </div>
        </div>
      </DialogComponent>
    </>
  );
};

export default EntityProfilePage;
