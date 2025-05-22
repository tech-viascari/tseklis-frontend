import React, { useState } from "react";
import TableComponent from "../../../../../components/TableComponent";
import GISTableComponent from "../../../../../components/GISTableComponent";
import { Typography } from "@material-tailwind/react";
import {
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
} from "../../../../../utils/global";
import DialogComponent from "../../../../../components/DialogComponent";
import { HiMinusCircle } from "react-icons/hi2";
import ButtonComponent from "../../../../../components/ButtonComponent";
import useDocumentDraftingStore from "../../../../../store/useDocumentDraftingStore";
import InputComponent from "../../../../../components/InputComponent";

export const SecCertListOfStockholdersForm = ({
  formData,
  errors,
  handleOnChange,
  officersOption,
  selectedOfficer,
  handleOnChangeAppointees,
  setFormData,
}) => {
  const [selectedAppointees, setSelectedAppointees] = useState(-1);

  const [appointeesDialog, setAppointeesDialog] = useState(false);
  const handleAppointeesDialog = () => {
    setAppointeesDialog(!appointeesDialog);
  };

  const { document_state } = useDocumentDraftingStore();

  const [appointeesData, setAppointeesData] = useState(
    document_state.appointeeState
  );

  const handleAppointeesData = (e) => {
    const { name, value } = e.target;
    setAppointeesData({ ...appointeesData, [name]: value });
  };

  const handleRowClick = (row, rowIndex) => {
    handleAppointeesDialog();
    setAppointeesData(row);
    setSelectedAppointees(rowIndex);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row, rowIndex) => {
        return (
          <div
            className="w-full"
            onClick={() => {
              handleRowClick(row, rowIndex);
            }}
          >
            <Typography variant="small" className="font-normal">
              {row.name}
            </Typography>
          </div>
        );
      },
    },
    {
      name: "ID Number",
      selector: (row) => row.id_no,
      cell: (row, rowIndex) => {
        return (
          <div
            className="w-full"
            onClick={() => {
              handleRowClick(row, rowIndex);
            }}
          >
            <Typography variant="small" className="font-normal">
              {row.id_no}
            </Typography>
          </div>
        );
      },
    },
    {
      name: "Date and Place Issued",
      selector: (row) => row.date_place_issued,
      cell: (row, rowIndex) => {
        return (
          <div
            className="w-full"
            onClick={() => {
              handleRowClick(row, rowIndex);
            }}
          >
            <Typography variant="small" className="font-normal">
              {row.date_place_issued}
            </Typography>
          </div>
        );
      },
    },
    {
      name: "",
      selector: (row) => null,
      cell: (row, rowIndex) => {
        return (
          <div className="flex flex-row items-center justify-center gap-3">
            <ButtonComponent
              className="bg-transparent"
              variant="text"
              onClick={() => {
                const filteredAppointees = formData.appointees.filter(
                  (_, i) => i !== rowIndex
                );
                setFormData({
                  ...formData,
                  appointees: filteredAppointees,
                });
              }}
            >
              <HiMinusCircle size={20} className="text-red-500" />
            </ButtonComponent>
          </div>
        );
      },
      width: "75px",
    },
  ];

  const handleAddAppointees = () => {
    if (selectedAppointees !== -1) {
      // Edit
      const updated = formData.appointees.map((appointee, index) => {
        if (index === selectedAppointees) {
          return appointeesData;
        }
        return appointee;
      });

      setFormData({
        ...formData,
        appointees: updated,
      });
    } else {
      // Add
      setFormData({
        ...formData,
        appointees: [...formData.appointees, appointeesData],
      });
    }
    setAppointeesData(document_state.appointeeState);
    setSelectedAppointees(-1);
    handleAppointeesDialog();
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <InputComponent
          label="Company Name"
          required
          name="corporate_name"
          value={formData.corporate_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Office Address"
          required
          name="office_address"
          value={formData.office_address}
          onChange={handleOnChange}
        />
        <InputComponent
          label="List of the Stockholders as of Date"
          type="date"
          required
          name="sec_cert_list_date"
          value={formData.sec_cert_list_date}
          onChange={handleOnChange}
        />

        <div className="flex flex-row gap-3 my-3">
          <Typography variant="small" className="font-medium">
            List of Stockholders
          </Typography>

          {formData.sec_cert_list_of_stockholders.length <= 0 && (
            <div className="flex flex-col gap-3">
              <Typography variant="small" className="font-normal text-red-500">
                - No data available. Please add stockholders in the GIS Tracker
                - List of Personalities.
              </Typography>
            </div>
          )}
        </div>
        <GISTableComponent
          data={formData.sec_cert_list_of_stockholders}
          columns={[
            {
              name: "Name",
              selector: (row) => row.name,
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {row.name}
                  </Typography>
                );
              },
            },
            {
              name: "Nationality",
              selector: (row) => row.nationality,
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {row.nationality}
                  </Typography>
                );
              },
            },
            {
              name: "Current Residential Address",
              selector: (row) => row.current_residential_address,
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {row.current_residential_address}
                  </Typography>
                );
              },
            },
            {
              name: "Type",
              selector: (row) => row.type,
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {row.type}
                  </Typography>
                );
              },
            },
            {
              name: "Number",
              selector: (row) => formatNumberWithCommaOnly(row.number),
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {formatNumberWithCommaOnly(row.number)}
                  </Typography>
                );
              },
            },
            {
              name: "Amount",
              selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {formatNumberWithCommaAndDecimal(row.amount)}
                  </Typography>
                );
              },
            },
            {
              name: "% of Ownership",
              selector: (row) =>
                formatNumberWithCommaAndDecimal(row.percent_of_ownership),
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {formatNumberWithCommaAndDecimal(row.percent_of_ownership)}%
                  </Typography>
                );
              },
            },
            {
              name: "Amount Paid in PHP",
              selector: (row) =>
                formatNumberWithCommaAndDecimal(row.amount_paid),
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {formatNumberWithCommaAndDecimal(row.amount_paid)}
                  </Typography>
                );
              },
            },
            {
              name: "Tax Identification Number",
              selector: (row) => row.tax_id_number,
              cell: (row) => {
                return (
                  <Typography className="font-normal text-sm">
                    {row.tax_id_number}
                  </Typography>
                );
              },
            },
          ]}
        />

        <div className="flex flex-row justify-between items-center mt-3">
          <Typography variant="small" className="font-medium">
            Appointees
          </Typography>
          <ButtonComponent onClick={handleAppointeesDialog}>
            Add row
          </ButtonComponent>
        </div>

        <div>
          <TableComponent columns={columns} data={formData.appointees} />
        </div>

        <Typography variant="small" className="mt-5 font-medium">
          Corporate Secretary
        </Typography>
        <InputComponent
          label="Name"
          required
          name="corp_sec"
          value={formData.corp_sec}
          onChange={handleOnChange}
        />
        <InputComponent
          label="Address"
          required
          name="corp_sec_address"
          value={formData.corp_sec_address}
          onChange={handleOnChange}
        />
      </div>

      <DialogComponent
        dialogName={appointeesDialog}
        handlerDialog={handleAppointeesDialog}
        title={`${selectedAppointees === -1 ? "Add" : "Edit"} Appointees`}
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleAppointeesDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={handleAddAppointees}
            >
              {selectedAppointees === -1 ? "Add" : "Save"}
            </ButtonComponent>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-3">
          <InputComponent
            label="Name"
            required
            name="name"
            value={appointeesData.name}
            onChange={handleAppointeesData}
          />
          <InputComponent
            label="ID Number"
            required
            name="id_no"
            value={appointeesData.id_no}
            onChange={handleAppointeesData}
          />
          <InputComponent
            label="Date and Place Issued"
            required
            name="date_place_issued"
            value={appointeesData.date_place_issued}
            onChange={handleAppointeesData}
          />
        </div>
      </DialogComponent>
    </>
  );
};
