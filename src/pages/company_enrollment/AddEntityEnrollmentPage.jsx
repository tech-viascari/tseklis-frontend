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
import EnhancedForm from "./EnhancedForm";

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
      "Legal Entity Information",
      <>
        <Typography variant="small" className="font-semibold text-sm">
          Legal Entity Information
        </Typography>
        <hr className="border-black" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10 mt-4">
          <SelectComponent
            label="Business Type"
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
              { name: "Sole", value: "Sole" },
              { name: "Partnership", value: "Partnership" },
              { name: "Corporation", value: "Corporation" },
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
            label="Client Type"
            name="client_type"
            value={companyData.basic_information.client_type}
            error_message={errors.basic_information?.client_type}
            onSelectChange={(value) => {
              handleOnSelectChange(
                "client_type",
                value,
                "Client Type is required.",
                "basic_information"
              );
            }}
            required={true}
            options={[
              { name: "Viascari Group of Companies", value: "VGC" },
              { name: "Computershare Clients", value: "Computershare" },
              { name: "External Clients", value: "External" },
            ]}
          />
        </div>
      </>
    ),
    getFormState(
      "Basic Information",
      <>
        <Typography variant="small" className="font-semibold text-sm">
          Basic Information
        </Typography>
        <hr className="border-black" />

        <div className="grid grid-cols-4 grid-rows-6 gap-5 pb-10 mt-4">
          <div className="col-span-4">
            <InputComponent
              label="Company Name"
              required={true}
              name="company_name"
              value={companyData.basic_information.company_name}
              error_message={errors.basic_information?.company_name}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Company Name is required.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-4 row-start-2">
            <InputComponent
              label="Company Address"
              required={true}
              name="company_address"
              value={companyData.basic_information.company_address}
              error_message={errors.basic_information?.company_address}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Company Address is required.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-2 row-start-3">
            <SelectComponent
              label="Type of Company"
              name="type_of_company"
              value={companyData.basic_information.type_of_company}
              error_message={errors.basic_information?.type_of_company}
              onSelectChange={(value) => {
                handleOnSelectChange(
                  "type_of_company",
                  value,
                  "Type of Company is required.",
                  "basic_information"
                );
              }}
              required={true}
              options={[
                { name: "Non Stock", value: "Non Stock" },
                { name: "Stock Domestic", value: "Stock Domestic" },
                {
                  name: "Stock Foreign Branch Office",
                  value: "Stock Foreign Branch Office",
                },
                {
                  name: "Stock Foreign Representative Office",
                  value: "Stock Foreign Representative Office",
                },
              ]}
            />
          </div>
          <div className="col-start-3 row-start-3">
            <InputComponent
              label="Corporate TIN"
              //required={true}
              name="corporate_tin"
              value={companyData.basic_information.corporate_tin}
              error_message={errors.basic_information?.corporate_tin}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Corporate TIN is optional, but please provide if available.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-start-4 row-start-3">
            <InputComponent
              label="SEC Registration Number"
              //required={true}
              name="sec_registration_number"
              value={companyData.basic_information.sec_registration_number}
              error_message={errors.basic_information?.sec_registration_number}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "SEC Registration Number is optional, but please provide if available.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-2 row-start-4">
            <InputComponent
              label="Official Email"
              required={true}
              name="official_email"
              type="email"
              value={companyData.basic_information.official_email}
              error_message={errors.basic_information?.official_email}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Official Email is required.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-2 col-start-3 row-start-4">
            <InputComponent
              label="Alternative Email"
              required={true}
              name="alternative_email"
              type="email"
              value={companyData.basic_information.alternative_email}
              error_message={errors.basic_information?.alternative_email}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Alternative Email is required.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-2 row-start-5">
            <InputComponent
              label="Official Contact Number"
              required={true}
              name="official_contact_number"
              value={companyData.basic_information.official_contact_number}
              error_message={errors.basic_information?.official_contact_number}
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Offiial Contact Number is required.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-2 col-start-3 row-start-5">
            <InputComponent
              label="Alternative Contact Number"
              required={true}
              name="alternative_contact_number"
              value={companyData.basic_information.alternative_contact_number}
              error_message={
                errors.basic_information?.alternative_contact_number
              }
              onChange={(e) => {
                handleOnChange(
                  e,
                  "Alternative Contact Number is required.",
                  "basic_information"
                );
              }}
            />
          </div>
          <div className="col-span-4 row-start-6">
            <InputComponent
              label="Company Logo"
              //required={true}
              type="file"
              name="company_logo"
              error_message={errors.basic_information?.company_logo}
              onChange={(e) => {
                handleFileChange(
                  e,
                  "Company Logo is optional, but please provide if available.",
                  "basic_information"
                );
              }}
            />
          </div>
        </div>
      </>
    ),
    getFormState(
      "Officers Information",
      <>
        <Typography variant="small" className="font-semibold text-sm">
          Directors / Officers
        </Typography>
        <hr className="border-black" />
        <div className="flex flex-row justify-end items-center w-full mt-5">
          <ButtonComponent
            className="bg-secondary text-light"
            onClick={() => handleOfficerDialog(null, {})}
          >
            Add Officer
          </ButtonComponent>
          <Dialog open={officerDialog} handler={handleOfficerDialog}>
            <DialogBody className="text-dark">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10 mt-4">
                <InputComponent
                  label="Name"
                  required={true}
                  name="officer_name"
                  value={officerData.officer_name}
                  error_message={errors.officer_information?.officer_name}
                  onChange={(e) => {
                    handleOnChangeOfficer(
                      e,
                      "Name is required.",
                      "officer_information"
                    );
                  }}
                />
                <InputComponent
                  label="Current Residential Address"
                  required={true}
                  name="current_residence"
                  value={officerData.current_residence}
                  error_message={errors.officer_information?.current_residence}
                  onChange={(e) => {
                    handleOnChangeOfficer(
                      e,
                      "Current Residential Address is required.",
                      "officer_information"
                    );
                  }}
                />
                <InputComponent
                  label="Nationality"
                  required={true}
                  name="nationality"
                  value={officerData.nationality}
                  error_message={errors.officer_information?.nationality}
                  onChange={(e) => {
                    handleOnChangeOfficer(
                      e,
                      "Nationality is required.",
                      "officer_information"
                    );
                  }}
                />
                <SelectComponent
                  label="Incorporator"
                  name="incorporator"
                  value={officerData.incorporator}
                  error_message={errors.officer_information?.incorporator}
                  onSelectChange={(value) => {
                    handleOnSelectOfficer(
                      value,
                      "Incorporator is required.",
                      "incorporator"
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
                  value={officerData.board}
                  error_message={errors.officer_information?.board}
                  onSelectChange={(value) => {
                    handleOnSelectOfficer(value, "Board is required.", "board");
                  }}
                  required={true}
                  options={[
                    { name: "Chairman", value: "C" },
                    { name: "Member", value: "M" },
                    { name: "Independent Director", value: "I" },
                  ]}
                />
                <SelectComponent
                  label="Gender"
                  name="gender"
                  value={officerData.gender}
                  error_message={errors.officer_information?.gender}
                  onSelectChange={(value) => {
                    handleOnSelectOfficer(
                      value,
                      "Gender is required.",
                      "gender"
                    );
                  }}
                  required={true}
                  options={[
                    { name: "Male", value: "M" },
                    { name: "Female", value: "F" },
                  ]}
                />
                <SelectComponent
                  label="Stock Holder"
                  name="stock_holder"
                  value={officerData.stock_holder}
                  error_message={errors.officer_information?.stock_holder}
                  onSelectChange={(value) => {
                    handleOnSelectOfficer(
                      value,
                      "Stock Holder is required.",
                      "stock_holder"
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
                  value={officerData.officer}
                  error_message={errors.officer_information?.officer}
                  onSelectChange={(value) => {
                    handleOnSelectOfficer(
                      value,
                      "Officer is required.",
                      "officer"
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
                    { name: "Compliance Officer", value: "Compliance Officer" },
                    { name: "Associated Person", value: "Associated Person" },
                    { name: "Not Applicable", value: "N/A" },
                  ]}
                />
                <SelectComponent
                  label="Executive Committee"
                  name="executive_committee"
                  value={officerData.executive_committee}
                  error_message={
                    errors.officer_information?.executive_committee
                  }
                  onSelectChange={(value) => {
                    handleOnSelectOfficer(
                      value,
                      "Executive Committee is required.",
                      "executive_committee"
                    );
                  }}
                  required={true}
                  options={[
                    { name: "Compensation Committee", value: "C" },
                    { name: "Compensation Committee - Chairman", value: "C/C" },
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
                  value={officerData.tax_identification_number}
                  error_message={
                    errors.officer_information?.tax_identification_number
                  }
                  onChange={(e) => {
                    handleOnChangeOfficer(
                      e,
                      "Tax Identification Number is required.",
                      "officer_information"
                    );
                  }}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <div className="flex flex-row gap-3 px-5 pb-3">
                <ButtonComponent
                  variant="outlined"
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  onClick={() => handleOfficerDialog(null, {})}
                >
                  Cancel
                </ButtonComponent>

                {officerIndex != -1 ? (
                  <ButtonComponent
                    className="bg-secondary"
                    onClick={() => handleOfficerUpdate()}
                  >
                    Update officer
                  </ButtonComponent>
                ) : (
                  <ButtonComponent
                    className="bg-secondary"
                    onClick={handleOfficerAdd}
                  >
                    Add officer
                  </ButtonComponent>
                )}
              </div>
            </DialogFooter>
          </Dialog>
        </div>

        <div className=" flex flex-col gap-3">
          {officerInformation.length == 0 ? (
            <>
              <div className="py-5 text-center justify-center items-center flex flex-col">
                <HiMiniExclamationCircle
                  className="text-orange-500"
                  size={25}
                />

                <Typography
                  variant="small"
                  className="text-center text-[15px] font-medium"
                >
                  No officers added yet.
                </Typography>

                <Typography
                  variant="small"
                  className="font-normal text-center text-[12px]"
                >
                  Click the add button above to add officers.
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row justify-between items-center">
                <Card className="h-full w-full overflow-scroll">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-gray-300 pb-4 px-5 pt-10"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none"
                            >
                              {head || "N/A"}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {officerInformation.map(
                        (
                          {
                            officer_name,
                            current_residence,
                            nationality,
                            incorporator,
                            board,
                            gender,
                            stock_holder,
                            officer,
                            executive_committee,
                            tax_identification_number,
                          },
                          index
                        ) => {
                          const isLast = index === TABLE_ROWS.length - 1;
                          const classes = isLast
                            ? "py-4"
                            : "py-4 border-b border-gray-300";

                          return (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 text-center"
                            >
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {officer_name || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {current_residence || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {nationality || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {incorporator || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {board || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {gender || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {stock_holder || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {officer || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {executive_committee || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-gray-600"
                                >
                                  {tax_identification_number || "N/A"}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <div className="flex flex-col px-5">
                                  <Menu placement="bottom-end">
                                    <MenuHandler>
                                      <Button
                                        variant="filled"
                                        size="sm"
                                        className="bg-white shadow-none hover:shadow-md normal-case font-medium border-light-gray focus:!border-light-gray"
                                      >
                                        <HiOutlineEllipsisHorizontal
                                          size={20}
                                          className="text-dark"
                                        />
                                      </Button>
                                    </MenuHandler>
                                    <MenuList>
                                      <MenuItem
                                        onClick={() => handleEditOfficer(index)}
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        className="text-red-400"
                                        onClick={() => {
                                          let filteredOfficer =
                                            officerInformation.filter(
                                              (_, _index) => _index != index
                                            );

                                          setOfficerInformation(
                                            filteredOfficer
                                          );
                                        }}
                                      >
                                        Delete
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            </>
          )}
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
          />

          <Typography variant="small" className="font-semibold text-sm">
            Officers Information
          </Typography>
          <hr className="border-light-gray" />

          <Card className="h-full w-full overflow-scroll px-6">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 px-5 pt-10"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head || "N/A"}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {officerInformation.map(
                  (
                    {
                      officer_name,
                      current_residence,
                      nationality,
                      incorporator,
                      board,
                      gender,
                      stock_holder,
                      officer,
                      executive_committee,
                      tax_identification_number,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "py-4"
                      : "py-4 border-b border-gray-300";

                    return (
                      <tr key={index} className="hover:bg-gray-50 text-center">
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {officer_name || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {current_residence || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {nationality || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {incorporator || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {board || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {gender || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {stock_holder || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {officer || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {executive_committee || "N/A"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {tax_identification_number || "N/A"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </>
    ),
  ];

  return (
    <MainContent
      items={[
        { title: "Entity Enrollment", goto: "/entity-enrollment" },
        { title: "Add Entity Enrollment", goto: "/entity-enrollment/new" },
      ]}
    >
      <div className="flex flex-col h-full w-full">
        <h1 className="text-md font-semibold text-lg">Add Entity Enrollment</h1>
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
