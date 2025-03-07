import React, { useEffect, useState } from "react";
import MainContent from "../layouts/MainContent";
import ButtonComponent from "../../components/ButtonComponent";
import {
  HiArrowSmallLeft,
  HiArrowSmallRight,
  HiMiniExclamationCircle,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import { useDirtyContext } from "../../providers/DirtyProvider";
import { useNavigate } from "react-router";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Card,
} from "@material-tailwind/react";

import { toast } from "sonner";
import ReviewComponent from "../../components/ReviewComponent";
import useCompanyEnrollmentStore from "../../store/useCompanyEnrollmentStore";
import EnhancedForm from "../company_enrollment/EnhancedForm";
import AddRowInputPrereq from "./AddRowInputPrereq";
import TaskTable from "./TaskTable";

const AddEntityEnrollmentPage = () => {
  //#region Form States

  //const here starts the initialization of the states and functions
  const { isDirty, setIsDirty } = useDirtyContext();
  const navigate = useNavigate();
  const { company, setCompany, states } = useCompanyEnrollmentStore();

  //form data that was stored in useCompanyEnrollmentStore
  const [companyData, setCompanyData] = useState(company);

  const [errors, setErrors] = useState({});

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [submitDialog, setSubmitDialog] = useState(false);

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

  //this handles the onchange of the input fields in the Basic Information
  const handleOnChange = (e, error_message, section) => {
    const { name, value } = e.target;

    setCompanyData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [section]: {
        ...prevErrors[section],
        [name]: value === "" ? error_message : "",
      },
    }));

    setIsDirty(true);
  };

  const handleOnSelectChange = (name, value, error_message, section) => {
    setCompanyData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [section]: {
        ...prevErrors[section],
        [name]: value === "" ? error_message : "",
      },
    }));
  };

  const handleFileChange = (e, error_message, section) => {
    const { name, files } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: files[0], // Store the file object
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [section]: {
        ...prevErrors[section],
        [name]: files.length === 0 ? error_message : "",
      },
    }));
  };

  // this handles the back button and next button
  const handleBack = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      if (isDirty) {
        const alert = confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );

        if (alert) {
          setIsDirty(false);
          navigate("/entity-enrollment");
        }
      } else {
        navigate("/entity-enrollment");
      }
    }
  };

  const handleNext = () => {
    console.log(companyData);
    if (selectedIndex < formComponent.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (selectedIndex == formComponent.length - 1) {
      handleSubmitDialog();
    }
  };

  //this handles the default value of the form
  const setToDefault = () => {
    let company = { ...companyData };
    // Loop through each key and set its value to an empty string
    for (let section in company) {
      if (company.hasOwnProperty(section)) {
        for (let key in company[section]) {
          if (company[section].hasOwnProperty(key)) {
            company[section][key] = "";
          }
        }
      }
    }
    setCompanyData(company);
    setErrors({});
    setPageIsLoading(false);
  };

  useEffect(() => {
    setToDefault();
  }, []);

  const handleSubmitDialog = (e) => {
    setSubmitDialog(!submitDialog);
  };

  const handleSubmit = () => {
    try {
      toast.success("Entity enrollment added successfully.");
      navigate("/entity-enrollment");
    } catch (error) {
      console.log(error);
    } finally {
      handleSubmitDialog();
    }
  };

  //This handles the dialog for the officer information
  const [officerIndex, setOfficerIndex] = useState(-1);
  const [officerDialog, setOfficerDialog] = useState(false);
  const [officerInformation, setOfficerInformation] = useState(
    company.officer_information || []
  );
  const [officerData, setOfficerData] = useState(
    states.officer_information || {}
  );

  const handleOnChangeOfficer = (e, error_message, section) => {
    const { name, value } = e.target;

    setOfficerData({ ...officerData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [section]: {
        ...prevErrors[section],
        [name]: value === "" ? error_message : "",
      },
    }));

    setIsDirty(true);
  };

  const handleOnSelectOfficer = (value, error_message, name) => {
    setOfficerData({ ...officerData, [name]: value });

    // setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [section]: {
    //         ...prevErrors[section],
    //         [name]: value === "" ? error_message : "",
    //     },
    // }));

    setIsDirty(true);
  };

  const handleOfficerDialog = (e, officer_info = {}) => {
    setOfficerData(states.officer_information);
    setOfficerDialog(!officerDialog);
  };

  const handleOfficerAdd = () => {
    setOfficerDialog(false);
    setOfficerInformation([...officerInformation, officerData]);
  };

  const handleOfficerUpdate = () => {
    let newOfficer = officerInformation.map((scope, index) => {
      if (index == officerIndex) {
        return officerData;
      }
      return scope;
    });

    setOfficerInformation(newOfficer);
    setOfficerDialog(false);
    setOfficerIndex(-1);
  };

  const handleEditOfficer = (index) => {
    setOfficerIndex(index);
    setOfficerData(officerInformation[index]);
    setOfficerDialog(true);
  };

  //this contains the table head and table rows
  const TABLE_HEAD = [
    "Name",
    "Address",
    "Nationality",
    "Inc'r",
    "Board",
    "Gender",
    "Stock Holder",
    "Officer",
    "Exec. Comm.",
    "TIN",
  ];

  const TABLE_ROWS = [
    {
      officer_name: companyData.officer_information.officer_name,
      current_residence: companyData.officer_information.current_residence,
      nationality: companyData.officer_information.nationality,
      incorporator: companyData.officer_information.incorporator,
      board: companyData.officer_information.board,
      gender: companyData.officer_information.gender,
      stock_holder: companyData.officer_information.stock_holder,
      officer: companyData.officer_information.officer,
      executive_committee: companyData.officer_information.executive_committee,
      tax_identification_number:
        companyData.officer_information.tax_identification_number,
    },
  ];

  //#endregion

  const formComponent = [
    getFormState(
      "Workflow Information",
      <>
        <Typography variant="small" className="font-semibold text-sm">
          Workflow Information
        </Typography>
        <hr className="border-black" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10 mt-4">
          <SelectComponent
            label="Select a Company"
            name="business_type"
            value={companyData.basic_information.business_type}
            error_message={errors.basic_information?.business_type}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "business_type",
                value,
                "Business Type is required.",
                "basic_information"
              );
            }}
            required={true}
            options={[
              { name: "Equinix", value: "Equinix" },
              { name: "Booking.com", value: "Booking.com" },
              { name: "Twitter PH", value: "Twitter PH" },
              // { name: "Cooperative", value: "Cooperative" },
              // { name: "Association", value: "Association" },
              // { name: "Foundation", value: "Foundation" },
              // { name: "Religious", value: "Religious" },
              // { name: "Non-Governmental", value: "Non-Governmental" },
              // { name: "Non-Profit", value: "Non-Profit" },
              // { name: "Others", value: "Others" },
            ]}
          />
          <SelectComponent
            label="Select Assignee"
            name="business_type"
            value={companyData.basic_information.business_type}
            error_message={errors.basic_information?.business_type}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "business_type",
                value,
                "Business Type is required.",
                "basic_information"
              );
            }}
            required={true}
            options={[
              { name: "Hannah", value: "Equinix" },
              { name: "Anthony", value: "Booking.com" },
              { name: "Benjie", value: "Twitter PH" },
              // { name: "Cooperative", value: "Cooperative" },
              // { name: "Association", value: "Association" },
              // { name: "Foundation", value: "Foundation" },
              // { name: "Religious", value: "Religious" },
              // { name: "Non-Governmental", value: "Non-Governmental" },
              // { name: "Non-Profit", value: "Non-Profit" },
              // { name: "Others", value: "Others" },
            ]}
          />
        </div>

        <h2>Pre Requisite</h2>
        <AddRowInputPrereq />
      </>
    ),
    getFormState(
      "Select Workflow",
      <>
        <Typography variant="small" className="font-semibold text-sm">
          SelectWorkflow
        </Typography>
        <hr className="border-black" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10 mt-4">
          <SelectComponent
            label="Select Workflow"
            name="business_type"
            value={companyData.basic_information.business_type}
            error_message={errors.basic_information?.business_type}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "business_type",
                value,
                "Business Type is required.",
                "basic_information"
              );
            }}
            required={true}
            options={[
              { name: "Incorporation", value: "Equinix" },
              { name: "BIR Registration", value: "Booking.com" },
              { name: "LUG Registrations", value: "Twitter PH" },
              // { name: "Cooperative", value: "Cooperative" },
              // { name: "Association", value: "Association" },
              // { name: "Foundation", value: "Foundation" },
              // { name: "Religious", value: "Religious" },
              // { name: "Non-Governmental", value: "Non-Governmental" },
              // { name: "Non-Profit", value: "Non-Profit" },
              // { name: "Others", value: "Others" },
            ]}
          />
        </div>
        <TaskTable />
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
          {/* <ReviewComponent
            title="Legal Entity Information"
            data={[
              {
                name: "Business Type",
                value: companyData.basic_information.business_type || "N/A",
              },
              {
                name: "Client Type",
                value: companyData.basic_information.client_type || "N/A",
              },
            ]}
          />

          <ReviewComponent
            title="Basic Information"
            data={[
              {
                name: "Company Name",
                value: companyData.basic_information.company_name || "N/A",
              },
              {
                name: "Company Address",
                value: companyData.basic_information.company_address || "N/A",
              },
              {
                name: "Type of Company",
                value: companyData.basic_information.type_of_company || "N/A",
              },
              {
                name: "Corporate TIN",
                value: companyData.basic_information.corporate_tin || "N/A",
              },
              {
                name: "SEC Registration Number",
                value:
                  companyData.basic_information.sec_registration_number ||
                  "N/A",
              },
              {
                name: "Official Email",
                value: companyData.basic_information.official_email || "N/A",
              },
              {
                name: "Alternative Email",
                value: companyData.basic_information.alternative_email || "N/A",
              },
              {
                name: "Official Contact Number",
                value:
                  companyData.basic_information.official_contact_number ||
                  "N/A",
              },
              {
                name: "Alternative Contact Number",
                value:
                  companyData.basic_information.alternative_contact_number ||
                  "N/A",
              },
            ]}
          /> */}
        </div>
      </>
    ),
  ];

  return (
    <MainContent
      items={[
        { title: "Workflow", goto: "/workflow" },
        { title: "Add Workflow", goto: "/workflow/addworklow" },
      ]}
    >
      <div className="flex flex-col h-full w-full">
        <h1 className="text-md font-semibold text-lg">Add Workflow</h1>
        <p className="text-sm font-normal">
          Please fill in the necessary details below.
        </p>

        <div className="flex flex-col h-full py-5 gap-3">
          <EnhancedForm
            formComponent={formComponent}
            selectedIndex={selectedIndex}
            pageIsLoading={pageIsLoading}
          />

          <div className="flex flex-row justify-between">
            <ButtonComponent
              variant="outlined"
              className="bg-transparent text-gray border-gray hover:text-red-400 hover:border-red-400 "
              onClick={handleBack}
            >
              <div className="flex flex-row gap-1 items-center">
                <HiArrowSmallLeft size={15} />
                {selectedIndex == 0 ? "Cancel" : "Back"}
              </div>
            </ButtonComponent>
            <ButtonComponent
              variant="outlined"
              className="bg-transparent text-gray border-gray hover:text-primary  hover:border-primary"
              onClick={handleNext}
            >
              <div className="flex flex-row gap-1 items-center">
                {selectedIndex == formComponent.length - 1 ? "Submit" : "Next"}
                <HiArrowSmallRight size={15} />
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>

      <Dialog open={submitDialog} handler={handleSubmitDialog} size="sm">
        <DialogHeader>
          <Typography variant="small" className="font-bold text-base">
            Add Entity Enrollment
          </Typography>
        </DialogHeader>
        <hr className="border-light-gray" />
        <DialogBody className="text-dark">
          <div className="flex flex-col gap-2">
            <Typography variant="small" className="font-normal text-sm">
              Are you sure you want to add this record?
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleSubmit}>
              Yes
            </ButtonComponent>
          </div>
        </DialogFooter>
      </Dialog>
    </MainContent>
  );
};

export default AddEntityEnrollmentPage;
