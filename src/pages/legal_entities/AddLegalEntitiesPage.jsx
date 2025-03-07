import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import ReviewComponent from "../../components/ReviewComponent";
import AddPageComponent from "../../components/AddPageComponent";
import DialogComponent from "../../components/DialogComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useDirtyContext } from "../../providers/DirtyProvider";
import InputComponent from "../../components/InputComponent";
import axiosInstance from "../../utils/axiosHelper";
import SelectComponent from "../../components/SelectComponent";

import useLegalEntities from "../../store/useLegalEntities";
import {
  HiArrowDownTray,
  HiMiniExclamationCircle,
  HiMiniExclamationTriangle,
} from "react-icons/hi2";
import TableComponent from "../../components/TableComponent";
import { convertBase64 } from "../../utils/global";

const AddLegalEntitiesPage = () => {
  //#region Form States
  const { states, entity, setEntity } = useLegalEntities();

  const { isDirty, setIsDirty } = useDirtyContext();

  const [formData, setFormData] = useState(states.entity.entity_details);

  const [errors, setErrors] = useState({});

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

  const [officerFormData, setOfficerFormData] = useState(
    states.officer_information
  );

  const [officerErrors, setOfficerErrors] = useState(
    states.officer_information
  );

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [fakePath, setFakePath] = useState("");
  const letterHeaderRef = useRef();

  const [officersDialog, setOfficersDialog] = useState(false);
  const handleOfficersDialog = () => {
    setOfficersDialog(!officersDialog);
  };

  const handleOfficerOnChange = (e, error_message) => {
    const { name, value } = e.target;

    setOfficerFormData({ ...officerFormData, [name]: value });

    if (value === "") {
      setOfficerErrors({ ...officerErrors, [name]: error_message });
    } else {
      setOfficerErrors({ ...officerErrors, [name]: "" });
    }
  };

  const toggleUpdateOfficer = () => {
    let officers = formData.officer_information.map((officer, index) => {
      if (index === officerIndex) {
        return officerFormData;
      }
      return officer;
    });

    setFormData({
      ...formData,
      officer_information: officers,
    });

    setOfficerIndex(-1);

    handleOfficersDialog(false);
  };

  const toggleRemoveOfficer = () => {
    let officers = formData.officer_information.filter(
      (officer, index) => index != officerIndex
    );

    setFormData({
      ...formData,
      officer_information: officers,
    });

    setOfficerIndex(-1);

    handleOfficersDialog();
  };

  const toggleAddOfficer = () => {
    setFormData({
      ...formData,
      officer_information: [...formData.officer_information, officerFormData],
    });

    handleOfficersDialog();
  };

  const [officerIndex, setOfficerIndex] = useState(-1);

  const handleFileChange = async (e) => {
    let base64 = await convertBase64(e.target.files[0]);
    setFakePath(base64);
  };

  const handleOfficerOnSelectChange = (name, value, error_message) => {
    setOfficerFormData({ ...officerFormData, [name]: value });

    if (value === "") {
      setOfficerErrors({ ...officerErrors, [name]: error_message });
    } else {
      setOfficerErrors({ ...officerErrors, [name]: "" });
    }
  };

  const triggerFileInput = () => {
    // This function will trigger the file input click
    document.getElementById("file-input").click();
  };

  const navigate = useNavigate();

  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const handleOnChange = (e, error_message) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setIsDirty(true);
  };

  const handleOnSelectChange = (name, value, error_message) => {
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors({ ...errors, [name]: error_message });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsFormSubmitting(true);
      let { entity_id, created_at, updated_at, ...filteredEntity } =
        states.entity;
      filteredEntity.entity_details = formData;
      filteredEntity.entity_logo = fakePath;

      const response = await axiosInstance.post(
        "/legal-entities",
        filteredEntity
      );
      if (response.status == 200) {
        toast.success("Entity has been successfully added!");
        navigate("/legal-entities");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error in adding the record.");
    } finally {
      handleSubmitDialog();
      setIsFormSubmitting(false);
    }
  };

  const getFormState = (title, form_contents) => {
    const formState = {
      title: "",
      form_contents: <></>,
    };

    return {
      ...formState,
      title,
      form_contents,
    };
  };

  const DisplayOfficersTable = () => {
    return (
      <>
        {formData.officer_information.length == 0 ? (
          <>
            <div className="py-5 text-center justify-center items-center flex flex-col">
              <HiMiniExclamationCircle className="text-orange-500" size={25} />

              <Typography
                variant="small"
                className="text-center text-[15px] font-medium"
              >
                No officer added yet.
              </Typography>

              <Typography
                variant="small"
                className="font-normal text-center text-[12px]"
              >
                Click the add button above to add a new officer.
              </Typography>
            </div>
          </>
        ) : (
          <TableComponent
            columns={[
              {
                name: "Name",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.officer_name}
                  </Typography>
                ),
              },
              {
                name: "Address",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.current_residence}
                  </Typography>
                ),
              },
              {
                name: "Nationality",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.nationality}
                  </Typography>
                ),
              },
              {
                name: "Incorporator",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.incorporator}
                  </Typography>
                ),
              },
              {
                name: "Board",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.board}
                  </Typography>
                ),
              },
              {
                name: "Gender",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.gender}
                  </Typography>
                ),
              },
              {
                name: "Stock Holder",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.stockholder}
                  </Typography>
                ),
              },
              {
                name: "Officer",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.officer}
                  </Typography>
                ),
              },
              {
                name: "Exec. Comm.",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.executive_committee}
                  </Typography>
                ),
              },
              {
                name: "TIN",
                selector: (row, index) => (
                  <Typography
                    variant="small"
                    className="font-normal text-sm text-dark"
                    onClick={() => {
                      setOfficerFormData(row);
                      setOfficerIndex(index);
                      handleOfficersDialog();
                    }}
                  >
                    {row.tax_identification_number}
                  </Typography>
                ),
              },
            ]}
            data={formData.officer_information}
          />
        )}
      </>
    );
  };

  //#endregion

  const formComponent = [
    getFormState(
      "Legal Entity Information",
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
          <SelectComponent
            label="Business Type"
            name="business_type"
            value={formData.business_type}
            error_message={errors.business_type}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "business_type",
                value,
                "Business Type is required."
              );
            }}
            required={true}
            options={states.business_types.map((type) => {
              return {
                name: type,
                value: type,
              };
            })}
          />
          <SelectComponent
            label="Client Type"
            error_message={errors.client_type}
            name="client_type"
            value={formData.client_type}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "client_type",
                value,
                "Client Type is required."
              );
            }}
            required
            options={states.client_types.map((type) => {
              return {
                name: type,
                value: type,
              };
            })}
          />
        </div>
      </>
    ),

    getFormState(
      "Basic Information",
      <>
        <div className="grid grid-cols-1 gap-5 pb-10">
          <InputComponent
            label="Entity Name"
            required={true}
            name="company_name"
            value={formData.company_name}
            error_message={errors.company_name}
            onChange={(e) => {
              handleOnChange(e, "Entity Name is required.");
            }}
          />
          <InputComponent
            label="Entity Address"
            required={true}
            name="company_address"
            value={formData.company_address}
            error_message={errors.company_address}
            onChange={(e) => {
              handleOnChange(e, "Entity Address is required.");
            }}
          />
          <SelectComponent
            label="Type of Company"
            name="type_of_company"
            value={formData.type_of_company}
            error_message={errors.type_of_company}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "type_of_company",
                value,
                "Type of Company is required."
              );
            }}
            required={true}
            options={states.company_types.map((type) => {
              return {
                name: type,
                value: type,
              };
            })}
          />
          <InputComponent
            label="Corporate TIN"
            name="corporate_tin"
            value={formData.corporate_tin}
            error_message={errors.corporate_tin}
            onChange={(e) => {
              handleOnChange(e, "");
            }}
          />
          <InputComponent
            label="SEC Registration Number"
            name="sec_registration_number"
            value={formData.sec_registration_number}
            error_message={errors.sec_registration_number}
            onChange={(e) => {
              handleOnChange(e, "");
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 pb-10">
          <InputComponent
            label="Official Email"
            required={true}
            name="official_email"
            value={formData.official_email}
            error_message={errors.official_email}
            onChange={(e) => {
              handleOnChange(e, "Official Email is required.");
            }}
          />
          <InputComponent
            label="Alternative Email"
            required={true}
            name="alternative_email"
            value={formData.alternative_email}
            error_message={errors.alternative_email}
            onChange={(e) => {
              handleOnChange(e, "Alternative Email is required.");
            }}
          />
          <InputComponent
            label="Official Contact Number"
            required={true}
            name="official_contact_number"
            value={formData.official_contact_number}
            error_message={errors.official_contact_number}
            onChange={(e) => {
              handleOnChange(e, "Official Contact Number is required.");
            }}
          />
          <InputComponent
            label="Alternative Contact Number"
            required={true}
            name="alternative_contact_number"
            value={formData.alternative_contact_number}
            error_message={errors.alternative_contact_number}
            onChange={(e) => {
              handleOnChange(e, "Alternative Contact Number is required.");
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 pb-10">
          <div className="flex flex-col gap-1">
            <Typography variant="small" className={`mb-1 font-normal`}>
              Entity Logo
            </Typography>

            <div
              className={`w-80 border border-dashed border-light-gray rounded-lg p-5 flex flex-col items-center gap-1 cursor-pointer ${
                fakePath != "" && "hidden"
              }`}
              onClick={triggerFileInput}
            >
              <HiArrowDownTray size={25} className="text-black/60" />
              <Typography
                variant="small"
                className={`font-medium text-sm text-black/60`}
              >
                Select an image here
              </Typography>
              <Typography
                variant="small"
                className={`font-normal text-sm text-black/60`}
              >
                Supported file types: .jpg, .jpeg, .png
              </Typography>
            </div>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/jpeg, image/jpg, image/png"
              ref={letterHeaderRef}
              onChange={handleFileChange}
            />

            {fakePath != "" && (
              <img
                className="cursor-pointer aspect-square w-32 object-contain"
                src={fakePath}
                alt="Logo"
                onClick={triggerFileInput}
              />
            )}

            {errors.company_logo && (
              <label className="text-xs text-red-500 flex flex-row gap-1 items-center">
                <HiMiniExclamationTriangle size={15} />
                {errors.company_logo}
              </label>
            )}
          </div>
        </div>
      </>
    ),

    getFormState(
      "Officers Information",
      <>
        <div className="grid grid-cols-1 gap-5 pb-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center w-full">
              <Typography variant="small" className="font-semibold">
                Directors/Officers: <span className="text-red-500">*</span>
              </Typography>
              <ButtonComponent
                className="bg-secondary text-light"
                onClick={() => {
                  setOfficerFormData(states.officer_information);
                  setOfficerIndex(-1);
                  handleOfficersDialog();
                }}
              >
                Add officer
              </ButtonComponent>
              <DialogComponent
                size="lg"
                dialogName={officersDialog}
                handlerDialog={handleOfficersDialog}
                title={`${
                  officerIndex !== -1 ? "Update Officer" : "Add Officer"
                }`}
                footerContent={
                  <div className="flex flex-row w-full justify-between gap-3 pb-3">
                    {officerIndex != -1 ? (
                      <ButtonComponent
                        variant="outlined"
                        className="bg-red-400 text-white border-red-400"
                        onClick={toggleRemoveOfficer}
                      >
                        Remove officer
                      </ButtonComponent>
                    ) : (
                      <span></span>
                    )}
                    <div className="flex flex-row gap-3">
                      <ButtonComponent
                        variant="outlined"
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                        onClick={handleOfficersDialog}
                      >
                        Cancel
                      </ButtonComponent>

                      {officerIndex != -1 ? (
                        <ButtonComponent
                          className="bg-secondary"
                          onClick={toggleUpdateOfficer}
                        >
                          Update officer
                        </ButtonComponent>
                      ) : (
                        <ButtonComponent
                          className="bg-secondary"
                          onClick={toggleAddOfficer}
                        >
                          Add officer
                        </ButtonComponent>
                      )}
                    </div>
                  </div>
                }
              >
                <div className="grid grid-cols-2 gap-2 py-5">
                  <InputComponent
                    label="Name"
                    required={true}
                    name="officer_name"
                    value={officerFormData.officer_name}
                    error_message={officerErrors.officer_name}
                    onChange={(e) => {
                      handleOfficerOnChange(e, "Name is required");
                    }}
                  />
                  <InputComponent
                    label="Current Residential Address"
                    required={true}
                    name="current_residence"
                    value={officerFormData.current_residence}
                    error_message={officerErrors.current_residence}
                    onChange={(e) => {
                      handleOfficerOnChange(
                        e,
                        "Current Residential Address is required"
                      );
                    }}
                  />
                  <InputComponent
                    label="Nationality"
                    required={true}
                    name="nationality"
                    value={officerFormData.nationality}
                    error_message={officerErrors.nationality}
                    onChange={(e) => {
                      handleOfficerOnChange(e, "Nationality is required");
                    }}
                  />
                  <SelectComponent
                    label="Incorporator"
                    name="incorporator"
                    value={officerFormData.incorporator}
                    error_message={officerErrors.incorporator}
                    onSelectChange={(value) => {
                      handleOfficerOnSelectChange(
                        "incorporator",
                        value,
                        "Incorporator is required."
                      );
                    }}
                    required={true}
                    options={[
                      { name: "Yes", value: "Y" },
                      { name: "No", value: "N" },
                    ]}
                  />

                  <SelectComponent
                    label="Board"
                    name="board"
                    value={officerFormData.board}
                    error_message={officerErrors.board}
                    onSelectChange={(value) => {
                      handleOfficerOnSelectChange(
                        "board",
                        value,
                        "Board is required."
                      );
                    }}
                    required={true}
                    options={[
                      { name: "Chairman", value: "C" },
                      { name: "Member", value: "M" },
                      {
                        name: "Independent Director",
                        value: "I",
                      },
                      {
                        name: "Not Applicable",
                        value: "N/A",
                      },
                    ]}
                  />

                  <SelectComponent
                    label="Gender"
                    name="gender"
                    value={officerFormData.gender}
                    error_message={officerErrors.gender}
                    onSelectChange={(value) => {
                      handleOfficerOnSelectChange(
                        "gender",
                        value,
                        "Gender is required."
                      );
                    }}
                    required={true}
                    options={[
                      { name: "Male", value: "M" },
                      { name: "Female", value: "F" },
                    ]}
                  />

                  <SelectComponent
                    label="Stockholder"
                    name="stockholder"
                    value={officerFormData.stockholder}
                    error_message={officerErrors.stockholder}
                    onSelectChange={(value) => {
                      handleOfficerOnSelectChange(
                        "stockholder",
                        value,
                        "Stockholder is required."
                      );
                    }}
                    required={true}
                    options={[
                      { name: "Yes", value: "Y" },
                      { name: "No", value: "N" },
                    ]}
                  />

                  <SelectComponent
                    label="Officer"
                    name="officer"
                    value={officerFormData.officer}
                    error_message={officerErrors.officer}
                    onSelectChange={(value) => {
                      handleOfficerOnSelectChange(
                        "officer",
                        value,
                        "Officer is required."
                      );
                    }}
                    required={true}
                    options={[
                      { name: "President", value: "President" },
                      { name: "Vice President", value: "Vice President" },
                      {
                        name: "Corporate Secretary",
                        value: "Corporate Secretary",
                      },
                      { name: "Treasurer", value: "Treasurer" },
                      {
                        name: "Compliance Officer",
                        value: "Compliance Officer",
                      },
                      { name: "Associated Person", value: "Associated Person" },
                      { name: "Not Applicable", value: "N/A" },
                    ]}
                  />

                  <SelectComponent
                    label="Executive Committee"
                    name="executive_committee"
                    value={officerFormData.executive_committee}
                    error_message={officerErrors.executive_committee}
                    onSelectChange={(value) => {
                      handleOfficerOnSelectChange(
                        "executive_committee",
                        value,
                        "Executive Committee is required."
                      );
                    }}
                    required={true}
                    options={[
                      { name: "Compensation Committee", value: "C" },
                      {
                        name: "Compensation Committee - Chairman",
                        value: "C/C",
                      },
                      { name: "Compensation Committee - Member", value: "C/M" },
                      { name: "Audit Committee", value: "A" },
                      { name: "Audit Committee - Chairman", value: "A/C" },
                      { name: "Audit Committee - Member", value: "A/M" },
                      { name: "Nominating Committee", value: "N" },
                      { name: "Nominating Committee - Chairman", value: "N/C" },
                      { name: "Nominating Committee - Member", value: "N/M" },
                      { name: "Not Applicable", value: "N/A" },
                    ]}
                  />
                  <InputComponent
                    label="Tax Identification Number"
                    required={true}
                    name="tax_identification_number"
                    value={officerFormData.tax_identification_number}
                    error_message={officerErrors.tax_identification_number}
                    onChange={(e) => {
                      handleOfficerOnChange(
                        e,
                        "Tax Identification Number is required"
                      );
                    }}
                  />
                </div>
              </DialogComponent>
            </div>
            <div className="flex flex-col gap-3">
              <DisplayOfficersTable />
            </div>
          </div>
        </div>
      </>
    ),

    getFormState(
      "Review Information",
      <>
        <div className="flex flex-col gap-5 pb-10">
          <div>
            <Typography variant="small" className="font-semibold text-md">
              Review Information
            </Typography>
            <Typography variant="small" className="font-normal text-sm">
              Kindly verify the details before submitting the record.
            </Typography>
          </div>

          <ReviewComponent
            title="Legal Entity Information"
            data={[
              {
                name: "Business Type",
                value: formData.business_type,
              },
              {
                name: "Client Type",
                value: formData.client_type,
              },
            ]}
          />

          <ReviewComponent
            title="Basic Information"
            data={[
              {
                name: "Entity Name",
                value: formData.company_name,
              },
              {
                name: "Entity Address",
                value: formData.company_address,
              },
              {
                name: "Type of Company",
                value: formData.type_of_company || "N/A",
              },
              {
                name: "Corporate TIN",
                value: formData.corporate_tin || "N/A",
              },
              {
                name: "SEC Registration Number",
                value: formData.sec_registration_number || "N/A",
              },
              {
                name: "Official Email",
                value: formData.official_email || "N/A",
              },
              {
                name: "Alternative Email",
                value: formData.alternative_email || "N/A",
              },
              {
                name: "Official Contact Number",
                value: formData.official_contact_number || "N/A",
              },
              {
                name: "Alternative Contact Number",
                value: formData.alternative_contact_number || "N/A",
              },
            ]}
          />

          <div className="flex flex-col gap-1">
            <Typography variant="small" className="font-semibold text-sm">
              Officers Information
            </Typography>
            <hr className="border-light-gray" />
            <div className="flex flex-col gap-3 mt-3">
              <DisplayOfficersTable />
            </div>
          </div>
        </div>
      </>
    ),
  ];

  const setToDefault = async () => {
    let form_data = { ...states.entity };
    // Loop through each key and set its value to an empty string
    for (let key in form_data) {
      if (form_data.hasOwnProperty(key)) {
        form_data[key] = "";
      }
    }

    setErrors(form_data);

    let officer_form_data = { ...states.officer_information };

    for (let key in officer_form_data) {
      if (officer_form_data.hasOwnProperty(key)) {
        officer_form_data[key] = "";
      }
    }

    setOfficerErrors(officer_form_data);
    setPageIsLoading(false);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <>
      <AddPageComponent
        items={[
          { title: "Legal Entities", goto: "/legal-entities" },
          { title: "Add New Entity", goto: "/legal-entities/add-new" },
        ]}
        title="Add New Entity"
        subtitle="Please fill in the necessary details below."
        handleSubmit={handleSubmitDialog}
        goBackTo="/legal-entities"
        formComponent={formComponent}
        setToDefault={setToDefault}
        pageIsLoading={pageIsLoading}
      />

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Entity"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              disabled={isFormSubmitting}
              loading={isFormSubmitting}
              className="bg-secondary"
              onClick={handleSubmit}
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
    </>
  );
};

export default AddLegalEntitiesPage;
