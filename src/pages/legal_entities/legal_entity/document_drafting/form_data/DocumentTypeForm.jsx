import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import useGISDocumentStore from "../../../../../store/useGISDocumentStore";
import SelectComponent from "../../../../../components/SelectComponent";
import useDocumentDraftingStore from "../../../../../store/useDocumentDraftingStore";

export const DocumentTypeForm = ({
  formData,
  setFormData,
  errors,
  onChange,
}) => {
  const [updateData, setUpdateData] = useState(formData);

  const { document_state } = useGISDocumentStore();

  const { states } = useDocumentDraftingStore();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

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

  const DocumentFormComponent = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const documentOptions = states.DocumentTypes.map((type) => {
      return {
        name: type,
        value: type,
      };
    });

    return (
      <div>
        <SelectComponent
          label="Select Document Type"
          name="type"
          required
          onSelectChange={(value) => {
            setFormData({ ...formData, type: value });
          }}
          value={formData.type}
          options={documentOptions}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="small" className="font-normal text-sm">
        STEP ONE
      </Typography>

      <Typography variant="small" className="font-bold text-md">
        Document Type
      </Typography>

      <div className="flex flex-col py-5 gap-8">
        {DocumentFormComponent(
          updateData,
          handleOnChange,
          false,
          false,
          "update"
        )}
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
          {DocumentFormComponent(
            updateData,
            handleOnChange,
            false,
            false,
            "update"
          )}
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

            <ButtonComponent
              className="bg-secondary"
              onClick={() => {
                // const updatedData =
                //   updateData.beneficial_ownership_declaration.map(
                //     (bod, index) => {
                //       if (index == selectedBODIndex) {
                //         return BODForm;
                //       }
                //       return bod;
                //     }
                //   );
                // setUpdateData({
                //   ...updateData,
                //   beneficial_ownership_declaration: updatedData,
                // });
                // handleAddBODDialog(
                //   document_state.beneficialOwnershipDeclaration
                // );
              }}
            >
              Save
            </ButtonComponent>
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
