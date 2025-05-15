import React, { useState } from "react";
import useDocumentDraftingStore from "../../../../../store/useDocumentDraftingStore";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../../../components/ButtonComponent";
import TableComponent from "../../../../../components/TableComponent";
import InputComponent from "../../../../../components/InputComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import { HiMinusCircle } from "react-icons/hi2";

export const AffidavitOfLossForm = ({
  formData,
  setFormData,
  errors,
  handleOnChange,
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
        <Typography variant="small" className="font-medium">
          Company Information
        </Typography>

        <InputComponent
          label="Company Name"
          required
          name="corporate_name"
          value={formData.corporate_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="SEC Registration Number"
          required
          name="sec_registration_number"
          value={formData.sec_registration_number}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Corporate TIN Number"
          required
          name="corporate_tin"
          value={formData.corporate_tin}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Principal Office"
          required
          name="office_address"
          value={formData.office_address}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Old Head Office Address"
          required
          name="old_head_office"
          value={formData.old_head_office}
          onChange={handleOnChange}
        />

        <InputComponent
          label="New Head Office Address"
          required
          name="new_head_office"
          value={formData.new_head_office}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Last Discovered Date of Loss"
          required
          name="last_discovered_date"
          value={formData.last_discovered_date}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Missing Items"
          required
          name="missing_items"
          value={formData.missing_items}
          onChange={handleOnChange}
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
        <div className="flex flex-col gap-3">
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
