import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import useGISDocumentStore from "../../../../../store/useGISDocumentStore";
import GISTableComponent from "../../../../../components/GISTableComponent";
import moment from "moment";
import { HiMinusCircle } from "react-icons/hi2";

export const BeneficialOwnershipForm = ({
  formData,
  setFormData,
  errors,
  onChange,
}) => {
  const [updateData, setUpdateData] = useState(formData);

  const { document_state } = useGISDocumentStore();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [selectedBODIndex, setSelectedBODIndex] = useState(-1);

  const [BODForm, setBODForm] = useState({
    ...document_state.beneficialOwnershipDeclaration,
  });

  const handleSave = () => {
    setFormData(updateData);
    setBODDialog(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleBODOnChange = (e) => {
    const { name, value } = e.target;
    setBODForm({ ...BODForm, [name]: value });
  };

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const [BODDialog, setBODDialog] = useState(false);
  const handleBODDialog = () => {
    setBODDialog(!BODDialog);
  };

  const [addBODDialog, setAddBODDialog] = useState(false);
  const handleAddBODDialog = (row) => {
    if (row.complete_name != undefined) {
      setBODForm(row);
    }
    setAddBODDialog(!addBODDialog);
    handleBODDialog();
  };

  const BODComponent = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const Content = (row, content, rowIndex = -1) => {
      return (
        <Typography
          className={`font-normal text-sm ${
            purpose != "preview" && "cursor-pointer"
          }`}
          onClick={() => {
            if (purpose != "preview") {
              handleAddBODDialog(row);
              setSelectedBODIndex(rowIndex);
            }
          }}
        >
          {content}
        </Typography>
      );
    };

    const BODColumn = [
      {
        name: "Complete Name (Surname, Given Name, Middle Name, Name Extension(i.e. Jr., Sr., III))",
        selector: (row, rowIndex) => {
          return Content(row, row.complete_name, rowIndex);
        },
      },
      {
        name: "Specific Residential Address",
        selector: (row, rowIndex) => {
          return Content(row, row.specific_residential_address, rowIndex);
        },
      },
      {
        name: "Nationality",
        selector: (row, rowIndex) => {
          return Content(row, row.nationality, rowIndex);
        },
      },
      {
        name: "Date of Birth",
        selector: (row, rowIndex) => {
          let dateOfBirth = row.date_of_birth;
          if (dateOfBirth == "") return "";

          return Content(
            row,
            moment(dateOfBirth).format("MMMM DD, YYYY"),
            rowIndex
          );
        },
      },
      {
        name: "Tax Identification Number",
        selector: (row, rowIndex) => {
          return Content(row, row.tax_id_number, rowIndex);
        },
      },
      {
        name: "% of Ownership / % of Voting Rights",
        selector: (row, rowIndex) => {
          return Content(row, row.percent_of_ownership, rowIndex);
        },
      },
      {
        name: "Type of Beneficial Owner [Direct (D) or Indirect (I)]",
        selector: (row, rowIndex) => {
          return Content(row, row.type_of_beneficial_owner, rowIndex);
        },
      },
      {
        name: "Category of Beneficial Ownership",
        selector: (row, rowIndex) => {
          return Content(row, row.category_of_beneficial_ownership, rowIndex);
        },
      },
      {
        name: "",
        selector: (row) => null,
        cell: (row, rowIndex) => {
          if (purpose == "preview") return;
          return (
            <ButtonComponent
              className=" bg-transparent"
              onClick={() => {
                const filteredData = updateData.beneficial_ownership_declaration.filter(
                  (_, index) => index != rowIndex
                );
                setUpdateData({
                  ...updateData,
                  beneficial_ownership_declaration: filteredData,
                });
              }}
            >
              <HiMinusCircle size={20} className="text-red-500" />
            </ButtonComponent>
          );
        },
        width: "60px",
      },
    ];

    return (
      <div>
        <div className="flex flex-row justify-between items-center">
          <div></div>
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleBODDialog}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="pt-3 flex flex-col gap-3">
          <div className="grid grid-cols-4">
            <div className="col-span-4 md:col-span-2">
              <InputComponent
                label="Corporate Secretary"
                name="corporate_secretary"
                required
                value={formData.corporate_secretary}
                onChange={onChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            {!showOpen && (
              <ButtonComponent
                className="py-1 text-gray"
                variant="outlined"
                onClick={() => {
                  handleAddBODDialog(
                    document_state.beneficialOwnershipDeclaration
                  );
                }}
              >
                Add row
              </ButtonComponent>
            )}
          </div>
          <GISTableComponent
            customRowStyle
            data={formData.beneficial_ownership_declaration}
            columns={BODColumn}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="small" className="font-normal text-sm">
        STEP THREE
      </Typography>

      <Typography variant="small" className="font-bold text-md">
        Beneficial Ownership Declaration
      </Typography>

      <div className="flex flex-col py-5 gap-8">
        {BODComponent(formData, () => {}, true, true, "preview")}
      </div>

      <DialogComponent
        size="lg"
        dialogName={BODDialog}
        handlerDialog={handleBODDialog}
        title="Update Beneficial Ownership Declaration"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent className="bg-red-400" onClick={handleBODDialog}>
              Cancel
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleSave}>
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          {BODComponent(updateData, handleOnChange, false, false, "update")}
        </div>
      </DialogComponent>

      <DialogComponent
        size="md"
        dialogName={addBODDialog}
        handlerDialog={handleAddBODDialog}
        title="Add Row"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleAddBODDialog}
            >
              Cancel
            </ButtonComponent>

            {selectedBODIndex != -1 ? (
              <ButtonComponent
                className="bg-secondary"
                onClick={() => {
                  const updatedData = updateData.beneficial_ownership_declaration.map(
                    (bod, index) => {
                      if (index == selectedBODIndex) {
                        return BODForm;
                      }
                      return bod;
                    }
                  );
                  setUpdateData({
                    ...updateData,
                    beneficial_ownership_declaration: updatedData,
                  });
                  handleAddBODDialog(
                    document_state.beneficialOwnershipDeclaration
                  );
                }}
              >
                Save
              </ButtonComponent>
            ) : (
              <ButtonComponent
                className="bg-secondary"
                onClick={() => {
                  setUpdateData({
                    ...updateData,
                    beneficial_ownership_declaration: [
                      ...updateData.beneficial_ownership_declaration,
                      BODForm,
                    ],
                  });
                  handleAddBODDialog(
                    document_state.beneficialOwnershipDeclaration
                  );
                }}
              >
                Add
              </ButtonComponent>
            )}
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          <InputComponent
            label="Complete Name"
            name="complete_name"
            value={BODForm.complete_name}
            onChange={handleBODOnChange}
            required
          />
          <InputComponent
            label="Specific Residential Address"
            name="specific_residential_address"
            value={BODForm.specific_residential_address}
            onChange={handleBODOnChange}
            required
          />
          <InputComponent
            label="Nationality"
            name="nationality"
            value={BODForm.nationality}
            onChange={handleBODOnChange}
            required
          />
          <InputComponent
            label="Date of Birth"
            name="date_of_birth"
            value={BODForm.date_of_birth}
            onChange={handleBODOnChange}
            type="date"
            required
          />
          <InputComponent
            label="Tax Identification Number"
            name="tax_id_number"
            value={BODForm.tax_id_number}
            onChange={handleBODOnChange}
            required
          />
          <InputComponent
            label="% of Ownership / % of Voting Rights"
            name="percent_of_ownership"
            value={BODForm.percent_of_ownership}
            onChange={handleBODOnChange}
            required
          />
          <InputComponent
            label="Type of Beneficial Owner [Direct (D) or Indirect (I)]"
            name="type_of_beneficial_owner"
            value={BODForm.type_of_beneficial_owner}
            onChange={handleBODOnChange}
            required
          />
          <InputComponent
            label="Category of Beneficial Ownership"
            name="category_of_beneficial_ownership"
            value={BODForm.category_of_beneficial_ownership}
            onChange={handleBODOnChange}
            required
          />
        </div>
      </DialogComponent>

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Quote"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={handleSave}
            >
              Yes
            </ButtonComponent>
          </div>
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure you want to add this record?
        </Typography>
      </DialogComponent>
    </div>
  );
};
