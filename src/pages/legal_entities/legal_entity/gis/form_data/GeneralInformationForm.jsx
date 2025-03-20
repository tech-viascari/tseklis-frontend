import { Card, Radio, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import TextAreaComponent from "../../../../../components/TextAreaComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import TableComponent from "../../../../../components/TableComponent";
import useGISDocumentStore from "../../../../../store/useGISDocumentStore";
import { HiMinusCircle } from "react-icons/hi2";

export const GeneralInformationForm = ({
  formData,
  setFormData,
  errors,
  onChange,
}) => {
  const [updateData, setUpdateData] = useState(formData);

  const { document_state } = useGISDocumentStore();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const [companyDetailsDialog, setCompanyDetailsDialog] = useState(false);
  const handleCompanyDetailsDialog = () => {
    setCompanyDetailsDialog(!companyDetailsDialog);
  };

  const [affiliationsDialog, setAffiliationsDialog] = useState(false);
  const handleAffiliationsDialog = () => {
    setAffiliationsDialog(!affiliationsDialog);
  };

  const [describeNatureDialog, setDescribeNatureDialog] = useState(false);
  const handleDescribeNatureDialog = () => {
    setDescribeNatureDialog(!describeNatureDialog);
  };

  const [directorsDialog, setDirectorsDialog] = useState(false);
  const handleDirectorsDialog = () => {
    setDirectorsDialog(!directorsDialog);
  };

  const handleSubmit = async () => {
    console.log("submit");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleFormSave = () => {
    setFormData(updateData);

    setCompanyDetailsDialog(false);
    setAffiliationsDialog(false);
    setDescribeNatureDialog(false);
    setDirectorsDialog(false);
  };

  const CompanyDetails = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const inputs_list = [
      {
        label: "SEC Registration Number",
        name: "sec_registration_number",
        value: formData.sec_registration_number,
        required: true,
      },
      {
        label: "Corporate Tax Identification Number (TIN)",
        name: "corporate_tin",
        value: formData.corporate_tin,
        required: true,
      },
      {
        label: "Year",
        name: "year",
        value: formData.year,
        required: true,
      },
      {
        label: "Date Registered",
        name: "date_registered",
        value: formData.date_registered,
        required: true,
        type: "date",
      },
      {
        label: "Corporate Name",
        name: "corporate_name",
        value: formData.corporate_name,
        required: true,
      },
      {
        label: "Fiscal Year End",
        name: "fiscal_year_end",
        value: formData.fiscal_year_end,
        required: true,
      },
      {
        label: "Business/Trade Name",
        name: "business_or_trade_name",
        value: formData.business_or_trade_name,
        required: true,
      },
      {
        label: "Official Email Address",
        name: "official_email_address",
        value: formData.official_email_address,
        required: true,
      },
      {
        label: "Alternate Email Address",
        name: "alternate_email_address",
        value: formData.alternate_email_address,
        required: true,
      },
      {
        label: "Complete Principal Office Address",
        name: "complete_principal_office_address",
        value: formData.complete_principal_office_address,
        required: true,
      },
      {
        label: "Official Mobile Number",
        name: "official_mobile_number",
        value: formData.official_mobile_number,
        required: true,
      },
      {
        label: "Alternate Phone Number",
        name: "alternate_phone_number",
        value: formData.alternate_phone_number,
      },
      {
        label: "Date of Annual Meeting Per By-Laws",
        name: "date_of_annual_meeting",
        value: formData.date_of_annual_meeting,
        required: true,
      },
      {
        label: `Actual Date of ${
          formData.is_special_meeting ? "Special" : "Annual"
        } Meeting`,
        name: "actual_date_of_annual_meeting",
        value: formData.actual_date_of_annual_meeting,
        required: true,
        type: "date",
      },
      {
        label: "Telephone Number",
        name: "telephone_number",
        value: formData.telephone_number,
        required: true,
      },
      {
        label: "Name of External Auditor & Signing Partner",
        name: "name_of_external_auditor",
        value: formData.name_of_external_auditor,
        required: true,
      },
      {
        label: "Industry Classification",
        name: "industry_classification",
        value: formData.industry_classification,
        required: true,
      },
      {
        label: "Fax Number",
        name: "fax_number",
        value: formData.fax_number,
        required: true,
      },
      {
        label: "SEC Accreditation Number (if applicable)",
        name: "sec_accreditation_number",
        value: formData.sec_accreditation_number,
      },
      {
        label: "Website URL Address",
        name: "website_url_address",
        value: formData.website_url_address,
      },
      {
        label: "Geographical Code",
        name: "geographical_code",
        value: formData.geographical_code,
      },
    ];
    return (
      <div>
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Company Details
          </Typography>
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleCompanyDetailsDialog}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="flex flex-col pt-5">
          <Typography variant="small" className={`mb-1 font-normal`}>
            Type of Meeting <span className="text-red-400">*</span>
          </Typography>
          <div className="flex flex-col sm:flex-row">
            <Radio
              name={`${purpose}-is_special_meeting`}
              label={
                <Typography variant="small" className={`font-normal`}>
                  Special
                </Typography>
              }
              disabled={disabled}
              checked={formData.is_special_meeting === true}
              onChange={() => {
                setUpdateData({
                  ...formData,
                  is_special_meeting: true,
                  is_amended: true,
                });
              }}
            />
            <Radio
              name={`${purpose}-is_special_meeting`}
              label={
                <Typography variant="small" className={`font-normal`}>
                  Annual
                </Typography>
              }
              disabled={disabled}
              checked={formData.is_special_meeting === false}
              onChange={() => {
                setUpdateData({
                  ...formData,
                  is_special_meeting: false,
                  is_amended: false,
                });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 items-end py-5">
          {inputs_list.map((input) => {
            let type = input.type != undefined ? input.type : "text";
            return (
              <div key={`${purpose}-${input.name}`}>
                <InputComponent
                  label={input.label}
                  name={input.name}
                  value={input.value}
                  required={input.required}
                  onChange={onChange}
                  disabled={disabled}
                  type={type}
                />
              </div>
            );
          })}
        </div>
        <div>
          <TextAreaComponent
            label="Primary Purpose/Activity/Industry Presently Engaged In"
            value={formData.primary_purpose}
            name="primary_purpose"
            onChange={onChange}
            disabled={disabled}
          />
        </div>
      </div>
    );
  };

  const intercompanyAffiliations = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const handleAffiliationOnChange = (e) => {
      const { name, value } = e.target;
      setUpdateData({
        ...formData,
        affiliations: {
          ...formData.affiliations,
          parent: { ...formData.affiliations.parent, [name]: value },
        },
      });
    };

    const handleAffiliationTableOnChange = (e, index) => {
      const { name, value } = e.target;

      const updatedAffiliation = formData.affiliations.subsidiary_affiliate.map(
        (affiliate, idx) => {
          if (index == idx) {
            return { ...affiliate, [name]: value };
          }
          return affiliate;
        }
      );
      setUpdateData({
        ...formData,
        affiliations: {
          ...formData.affiliations,
          subsidiary_affiliate: updatedAffiliation,
        },
      });
    };

    return (
      <div className="">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Intercompany Affiliations
          </Typography>
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleAffiliationsDialog}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 items-end py-5">
          <InputComponent
            label="Parent Company"
            name="name"
            value={formData.affiliations.parent.name}
            onChange={handleAffiliationOnChange}
            disabled={disabled}
          />
          <InputComponent
            label="SEC Registration No."
            name="sec_no"
            value={formData.affiliations.parent.sec_no}
            onChange={handleAffiliationOnChange}
            disabled={disabled}
          />
          <InputComponent
            label="Address"
            name="address"
            value={formData.affiliations.parent.address}
            onChange={handleAffiliationOnChange}
            disabled={disabled}
          />
        </div>
        {!showOpen && (
          <div className="pt-5 flex flex-row justify-end">
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={() => {
                setUpdateData({
                  ...formData,
                  affiliations: {
                    ...formData.affiliations,
                    subsidiary_affiliate: [
                      ...formData.affiliations.subsidiary_affiliate,
                      document_state.affiliations,
                    ],
                  },
                });
              }}
            >
              Add row
            </ButtonComponent>
          </div>
        )}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 p-4">
                  <Typography variant="small" className="font-normal">
                    Subsidiary/Affiliate
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 p-4">
                  <Typography variant="small" className="font-normal">
                    SEC Registration No.
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 p-4">
                  <Typography variant="small" className="font-normal">
                    Address
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {formData.affiliations.subsidiary_affiliate.map(
                (affiliation, index) => {
                  return (
                    <tr key={`affiliation-${index}`}>
                      <td className="pl-4">
                        <InputComponent
                          name="name"
                          value={affiliation.name}
                          onChange={(e) => {
                            handleAffiliationTableOnChange(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="sec_no"
                          value={affiliation.sec_no}
                          onChange={(e) => {
                            handleAffiliationTableOnChange(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="address"
                          value={affiliation.address}
                          onChange={(e) => {
                            handleAffiliationTableOnChange(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td>
                        {index != 0 && !showOpen && (
                          <div className="flex flex-col w-full h-full items-center">
                            <ButtonComponent
                              className="bg-transparent"
                              variant="text"
                              onClick={() => {
                                const filteredData =
                                  formData.affiliations.subsidiary_affiliate.filter(
                                    (_, idx) => idx != index
                                  );
                                setUpdateData({
                                  ...formData,
                                  affiliations: {
                                    ...formData.affiliations,
                                    subsidiary_affiliate: filteredData,
                                  },
                                });
                              }}
                            >
                              <HiMinusCircle
                                size={20}
                                className="text-red-500"
                              />
                            </ButtonComponent>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const describeNature = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    return (
      <div>
        <div className="flex flex-row justify-end items-center">
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleDescribeNatureDialog}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="grid grid-cols-2">
          <InputComponent
            label="Describe nature of business"
            name="nature_of_business"
            value={formData.nature_of_business}
            required={true}
            onChange={onChange}
            disabled={disabled}
            type="text"
          />
        </div>
        <div className="flex flex-col w-full gap-3 mt-5">
          <div className="flex flex-row gap-10 col-span-1 md:col-span-2 lg:col-span-3 justify-between">
            <Typography variant="small" className="font-normal text-sm">
              Is the Corporation a covered person under the Anti Money
              Laundering Act (AMLA), as amended? (Rep. Acts.
              9160/9164/10167/10365)
            </Typography>
            <div className="flex flex-col sm:flex-row gap-5">
              <Radio
                name={`${purpose}-is_under_AMLA`}
                label="Yes"
                disabled={disabled}
                checked={formData.is_under_AMLA === true}
                onChange={() => {
                  setUpdateData({ ...formData, is_under_AMLA: true });
                }}
              />
              <Radio
                name={`${purpose}-is_under_AMLA`}
                label="No"
                disabled={disabled}
                checked={formData.is_under_AMLA === false}
                onChange={() => {
                  setUpdateData({ ...formData, is_under_AMLA: false });
                }}
              />
            </div>
          </div>
          <hr className="col-span-1 md:col-span-2 lg:col-span-3 text-light-gray" />
          <div className="flex flex-row gap-10 col-span-1 md:col-span-2 lg:col-span-3 justify-between">
            <Typography variant="small" className="font-normal text-sm">
              Has the Corporation complied with the requirements on Customer Due
              Diligence (CDD) or Know Your Customer (KYC), record-keeping, and
              submission of reports under the AMLA, as amended, since the last
              filing of its GIS?
            </Typography>
            <div className="flex flex-col sm:flex-row gap-5">
              <Radio
                name={`${purpose}-has_complied_with_the_requirements`}
                label="Yes"
                disabled={disabled}
                checked={formData.has_complied_with_the_requirements === true}
                value={true}
                onChange={() => {
                  setUpdateData({
                    ...formData,
                    has_complied_with_the_requirements: true,
                  });
                }}
              />
              <Radio
                name={`${purpose}-has_complied_with_the_requirements`}
                label="No"
                disabled={disabled}
                checked={formData.has_complied_with_the_requirements === false}
                value={false}
                onChange={() => {
                  setUpdateData({
                    ...formData,
                    has_complied_with_the_requirements: false,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const directors = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const handleDirector = (e, index) => {
      const { name, value } = e.target;
      const updatedData = updateData.directors_or_officers.map(
        (director, idx) => {
          if (idx === index) {
            return { ...director, [name]: value };
          }
          return director;
        }
      );
      setUpdateData({ ...updateData, directors_or_officers: updatedData });
    };

    return (
      <div className="pb-10">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Directors/Officers
          </Typography>
          {showOpen ? (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleDirectorsDialog}
            >
              Update Details
            </ButtonComponent>
          ) : (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={() => {
                console.log(document_state.directorsOrOfficers);
                setUpdateData({
                  ...updateData,
                  directors_or_officers: [
                    ...updateData.directors_or_officers,
                    document_state.directorsOrOfficers,
                  ],
                });
              }}
            >
              Add row
            </ButtonComponent>
          )}
        </div>
        <div className="w-full overflow-x-auto pt-5">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Current Residential Address
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Nationality
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Incorporator
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Board
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Gender
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Stockholder
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Officer
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Executive Committee
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 place-content-end px-4">
                  <Typography variant="small" className="font-normal">
                    Tax Identification
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {formData.directors_or_officers.length == 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-3">
                    <Typography variant="small" className="font-medium text-sm">
                      No records found.
                    </Typography>
                  </td>
                </tr>
              ) : (
                formData.directors_or_officers.map((director, index) => {
                  return (
                    <tr key={`director-${index}`}>
                      <td className="pl-4">
                        <InputComponent
                          name="name"
                          value={director.name}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="current_residential_address"
                          value={director.current_residential_address}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="nationality"
                          value={director.nationality}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="incorporator"
                          value={director.incorporator}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="board"
                          value={director.board}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="gender"
                          value={director.gender}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="stock_holder"
                          value={director.stock_holder}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="officer"
                          value={director.officer}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="executive_committee"
                          value={director.executive_committee}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td className="pl-4">
                        <InputComponent
                          name="tax_id_number"
                          value={director.tax_id_number}
                          onChange={(e) => {
                            handleDirector(e, index);
                          }}
                          disabled={disabled}
                        />
                      </td>
                      <td>
                        {index != 0 && !showOpen && (
                          <div className="flex flex-col w-full h-full items-center">
                            <ButtonComponent
                              className="bg-transparent"
                              variant="text"
                              onClick={() => {
                                const filteredData =
                                  formData.directors_or_officers.filter(
                                    (_, idx) => idx != index
                                  );
                                setUpdateData({
                                  ...formData,
                                  directors_or_officers: filteredData,
                                });
                              }}
                            >
                              <HiMinusCircle
                                size={20}
                                className="text-red-500"
                              />
                            </ButtonComponent>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (formData.corporate_name != "") {
      setUpdateData(formData);
    }
  }, [formData]);

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="small" className="font-normal text-sm">
        STEP ONE
      </Typography>
      <Typography variant="small" className="font-bold text-md">
        General Information
      </Typography>

      <div className="flex flex-col py-5 gap-8">
        {CompanyDetails(formData, () => {}, true, true, "preview")}
        <hr className="text-gray" />
        {intercompanyAffiliations(formData, () => {}, true, true, "preview")}
        <hr className="text-gray" />
        {describeNature(formData, () => {}, true, true, "preview")}
        <hr className="text-gray" />
        {directors(formData, () => {}, true, true, "preview")}
      </div>

      <DialogComponent
        size="lg"
        dialogName={companyDetailsDialog}
        handlerDialog={handleCompanyDetailsDialog}
        title="Update Details"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleCompanyDetailsDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleFormSave}>
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full">
          {CompanyDetails(updateData, handleOnChange, false, false, "update")}
        </div>
      </DialogComponent>

      <DialogComponent
        size="lg"
        dialogName={affiliationsDialog}
        handlerDialog={handleAffiliationsDialog}
        title="Update Details"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleAffiliationsDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleFormSave}>
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full">
          {intercompanyAffiliations(
            updateData,
            handleOnChange,
            false,
            false,
            "update"
          )}
        </div>
      </DialogComponent>

      <DialogComponent
        size="lg"
        dialogName={describeNatureDialog}
        handlerDialog={handleDescribeNatureDialog}
        title="Update Details"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleDescribeNatureDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleFormSave}>
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full">
          {describeNature(updateData, handleOnChange, false, false, "update")}
        </div>
      </DialogComponent>

      <DialogComponent
        size="lg"
        dialogName={directorsDialog}
        handlerDialog={handleDirectorsDialog}
        title="Update Details"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleDirectorsDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent className="bg-secondary" onClick={handleFormSave}>
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full">
          {directors(updateData, handleOnChange, false, false, "update")}
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
    </div>
  );
};
