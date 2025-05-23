import React, { useState } from "react";
import useDocumentDraftingStore from "../../../../../store/useDocumentDraftingStore";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import { HiMinusCircle } from "react-icons/hi2";
import InputComponent from "../../../../../components/InputComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import TableComponent from "../../../../../components/TableComponent";

export const SecCertWaiverOfPreemptiveRightsForm = ({
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
          label="Year"
          required
          name="year"
          value={formData.year}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Meeting Date"
          type="date"
          required
          name="sec_cert_waiver_date"
          value={formData.sec_cert_waiver_date}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Meeting Place"
          required
          name="sec_cert_waiver_place"
          value={formData.sec_cert_waiver_place}
          onChange={handleOnChange}
        />

        <div className="flex flex-col gap-3 my-3">
          <Typography variant="small" className="font-medium">
            Authorized Capital Stock
          </Typography>

          <div className="flex-1 flex-col gap-3 lg:flex lg:justify-between lg:flex-row">
            <InputComponent
              label="From (Pesos)"
              placeholder="ONE MILLION PESOS (₱1,000,000.00)"
              required
              name="sec_cert_waiver_authstock_from"
              value={formData.sec_cert_waiver_authstock_from}
              onChange={handleOnChange}
            />

            <InputComponent
              label="Divided Into"
              placeholder="ONE MILLION PESOS (₱1,000,000.00)"
              required
              name="sec_cert_waiver_authstock_from_divided_into"
              value={formData.sec_cert_waiver_authstock_from_divided_into}
              onChange={handleOnChange}
            />

            <InputComponent
              label="Par Value"
              placeholder="ONE PESO (₱1.00)"
              required
              name="sec_cert_waiver_authstock_from_par_value"
              value={formData.sec_cert_waiver_authstock_from_par_value}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex-1 flex-col gap-3 lg:flex lg:justify-between lg:flex-row">
            <InputComponent
              label="To (Pesos)"
              placeholder="FIVE MILLION PESOS (₱5,000,000.00)"
              required
              name="sec_cert_waiver_authstock_to"
              value={formData.sec_cert_waiver_authstock_to}
              onChange={handleOnChange}
            />

            <InputComponent
              label="Divided Into"
              placeholder="FIVE MILLION PESOS (₱5,000,000.00)"
              required
              name="sec_cert_waiver_authstock_to_divided_into"
              value={formData.sec_cert_waiver_authstock_to_divided_into}
              onChange={handleOnChange}
            />

            <InputComponent
              label="Par Value"
              placeholder="ONE PESO (₱1.00)"
              required
              name="sec_cert_waiver_authstock_to_par_value"
              value={formData.sec_cert_waiver_authstock_to_par_value}
              onChange={handleOnChange}
            />
          </div>
        </div>

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
