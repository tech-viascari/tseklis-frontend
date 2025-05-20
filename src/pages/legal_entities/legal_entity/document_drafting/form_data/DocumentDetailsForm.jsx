import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import SelectComponent from "../../../../../components/SelectComponent";
import useDocumentDraftingStore from "../../../../../store/useDocumentDraftingStore";
import { formatNumberWithCommaAndDecimal } from "../../../../../utils/global";
import CGRForm from "../forms/CGRForm";
import AffidavitOfNonOperationForm from "../forms/AffidavitOfNonOperationForm";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import { CoverSheetforAFSForm } from "../forms/CoverSheetforAFSForm";
import { SMRForm } from "../forms/SMRForm";
import { rdoData } from "../forms/rdoData";
import { WaiverOfNoticeForm } from "../forms/WaiverOfNoticeForm";
import { NoticeOfMeeting } from "../forms/NoticeOfMeeting";
import { SMR_BIRForm } from "../forms/SMR_BIRForm";
import { SMR_SECForm } from "../forms/SMR_SECForm";
import { RNHASMForm } from "../forms/RNHASMForm";
import { IndependentAuditorsForm } from "../forms/IndependentAuditorsForm";
import { AffidavitOfLossForm } from "../forms/AffidavitOfLossForm";
import { SPAforBusinessRenewalForm } from "../forms/SPAforBusinessRenewalForm";
import { SecCertNoDisputeForm } from "../forms/SecCertNoDisputeForm";

export const DocumentDetailsForm = ({
  formData,
  setFormData,
  officers,
  setOfficers,
  selectedOfficer,
}) => {
  const { states, document_state } = useDocumentDraftingStore();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const handleOnChange = async (e, fieldName) => {
    const { name, value } = e.target;

    const data = formData;

    let sum = 0;

    if (
      name == "revenue_q1" ||
      name == "revenue_q2" ||
      name == "revenue_q3" ||
      name == "revenue_q4"
    ) {
      let newValue = parseFloat(value);

      let q1 = Number(data.revenue_q1);
      let q2 = Number(data.revenue_q2);
      let q3 = Number(data.revenue_q3);
      let q4 = Number(data.revenue_q4);

      if (name == "revenue_q1") {
        sum = newValue + q2 + q3 + q4;
      }

      if (name == "revenue_q2") {
        sum = q1 + newValue + q3 + q4;
      }

      if (name == "revenue_q3") {
        sum = q1 + q2 + newValue + q4;
      }

      if (name == "revenue_q4") {
        sum = q1 + q2 + q3 + newValue;
      }

      setFormData({
        ...formData,
        [name]: value,
        total_revenue: sum,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (value == "") {
      setErrors({
        ...errors,
        [name]: `${fieldName} is required.`,
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const officersOption = officers.map((officer) => {
    return {
      name: `${officer.officer_name} - ${officer.officer}`,
      value: officer.officer_name,
    };
  });

  const rdoAddressOption = rdoData.map((rdo) => {
    if (rdo.rdo_address.split(", ").length > 1) {
      return {
        name: `${rdo.rdo_city} / ${rdo.rdo_address.split(", ")[1]}`,
        value: rdo.rdo_code,
      };
    } else {
      return {
        name: `${rdo.rdo_city} / ${rdo.rdo_address.split(", ")[0]}`,
        value: rdo.rdo_code,
      };
    }
  });

  const coverSheetDepartment = [
    { name: "Markets and Securities Regulation Department", value: "MSRD" },
    { name: "Corporate Governance and Finance Department", value: "CGFD" },
    { name: "Company Registration and Monitoring Department", value: "CRMD" },
    { name: "Financial Analysis and Audit Department", value: "FAAD" },
    { name: "Enforcement and Investor Protection Department", value: "EIPD" },
    { name: "Economic Research and Training Department", value: "ERTD" },
    {
      name: "Information and Communications Technology Department",
      value: "ICTD",
    },
    { name: "Human Resources Department", value: "HRD" },
    { name: "Management Services Department", value: "MSD" },
    { name: "Financial Management Department", value: "FMD" },
    { name: "External Affairs Department", value: "EAD" },
  ];

  const coverSheetDepartmentOption = coverSheetDepartment.map((department) => {
    return {
      name: department.name,
      value: department.value,
    };
  });

  const rnhasmReasons = [
    {
      name: "No Quorum",
      value:
        "The corporation failed to achieve quorum on the scheduled date, and the board has not yet determined a new date for the rescheduled meeting.",
    },
    {
      name: "Ongoing Deliberations",
      value:
        "Deliberations are ongoing regarding the rescheduling of the meeting due to ",
    },
    {
      name: "Other Reasons",
      value: "[Please put your reason here and delete this text]",
    },
  ];

  const rnhasmReasonOption = rnhasmReasons.map((reason) => {
    return {
      name: reason.name,
      value: reason.value,
    };
  });

  const noOfStockholders = [
    {
      number: "One",
      iar_no_of_stockholders: "one",
      iar_no_of_stockholders_int: "1",
    },
    {
      number: "Two",
      iar_no_of_stockholders: "two",
      iar_no_of_stockholders_int: "2",
    },
    {
      number: "Three",
      iar_no_of_stockholders: "three",
      iar_no_of_stockholders_int: "3",
    },
    {
      number: "Four",
      iar_no_of_stockholders: "four",
      iar_no_of_stockholders_int: "4",
    },
    {
      number: "Five",
      iar_no_of_stockholders: "five",
      iar_no_of_stockholders_int: "5",
    },
    {
      number: "Six",
      iar_no_of_stockholders: "six",
      iar_no_of_stockholders_int: "6",
    },
    {
      number: "Seven",
      iar_no_of_stockholders: "seven",
      iar_no_of_stockholders_int: "7",
    },
    {
      number: "Eight",
      iar_no_of_stockholders: "eight",
      iar_no_of_stockholders_int: "8",
    },
    {
      number: "Nine",
      iar_no_of_stockholders: "nine",
      iar_no_of_stockholders_int: "9",
    },
    {
      number: "Ten",
      iar_no_of_stockholders: "ten",
      iar_no_of_stockholders_int: "10",
    },
    {
      number: "Eleven",
      iar_no_of_stockholders: "eleven",
      iar_no_of_stockholders_int: "11",
    },
    {
      number: "Twelve",
      iar_no_of_stockholders: "twelve",
      iar_no_of_stockholders_int: "12",
    },
    {
      number: "Thirteen",
      iar_no_of_stockholders: "thirteen",
      iar_no_of_stockholders_int: "13",
    },
    {
      number: "Fourteen",
      iar_no_of_stockholders: "fourteen",
      iar_no_of_stockholders_int: "14",
    },
    {
      number: "Fifteen",
      iar_no_of_stockholders: "fifteen",
      iar_no_of_stockholders_int: "15",
    },
    {
      number: "Sixteen",
      iar_no_of_stockholders: "sixteen",
      iar_no_of_stockholders_int: "16",
    },
    {
      number: "Seventeen",
      iar_no_of_stockholders: "seventeen",
      iar_no_of_stockholders_int: "17",
    },
    {
      number: "Eighteen",
      iar_no_of_stockholders: "eighteen",
      iar_no_of_stockholders_int: "18",
    },
    {
      number: "Nineteen",
      iar_no_of_stockholders: "nineteen",
      iar_no_of_stockholders_int: "19",
    },
    {
      number: "Twenty",
      iar_no_of_stockholders: "twenty",
      iar_no_of_stockholders_int: "20",
    },
    {
      number: "Twenty-One",
      iar_no_of_stockholders: "twenty-one",
      iar_no_of_stockholders_int: "21",
    },
    {
      number: "Twenty-Two",
      iar_no_of_stockholders: "twenty-two",
      iar_no_of_stockholders_int: "22",
    },
    {
      number: "Twenty-Three",
      iar_no_of_stockholders: "twenty-three",
      iar_no_of_stockholders_int: "23",
    },
    {
      number: "Twenty-Four",
      iar_no_of_stockholders: "twenty-four",
      iar_no_of_stockholders_int: "24",
    },
    {
      number: "Twenty-Five",
      iar_no_of_stockholders: "twenty-five",
      iar_no_of_stockholders_int: "25",
    },
  ];

  const noOfStockholdersOption = noOfStockholders.map((stockholder) => {
    return {
      name: stockholder.number,
      value: stockholder.iar_no_of_stockholders,
      iar_no_of_stockholders_int: stockholder.iar_no_of_stockholders_int,
    };
  });

  const DocumentFormComponent = (
    formData,
    officers,
    handleOnChange,
    setFormData
  ) => {
    const handleOnChangeAppointees = (value) => {
      let newFormData = { ...formData };
      const selectedOfficer = officers.filter((_) => _.officer_name == value);

      if (selectedOfficer.length != 0) {
        // office_address
        newFormData.office_address = selectedOfficer[0].current_residence;
        // officer_name
        newFormData.officer_name = selectedOfficer[0].officer_name;
        // officer_nationality
        newFormData.officer_nationality = selectedOfficer[0].nationality;
        // officer_position
        newFormData.officer_position = selectedOfficer[0].officer;
      }

      setFormData(newFormData);
    };

    //for Cover Sheet for Audited Financial Statements
    const handleOnChangeDepartment = (e) => {
      const selectedDepartment = coverSheetDepartment.find(
        (department) => department.value === e
      );
      setFormData({
        ...formData,
        department: selectedDepartment.value,
      });
    };

    //for SMR
    const handleRDOChange = (e) => {
      const selectedRDO = rdoData.find((rdo) => rdo.rdo_code === e);
      setFormData({
        ...formData,
        rdo_number: selectedRDO.rdo_code,
        rdo_address: selectedRDO.rdo_address,
        rdo_city: selectedRDO.rdo_city,
      });
    };

    const handleRDOBIRChange = (e) => {
      const selectedRDO = rdoData.find((rdo) => rdo.rdo_code === e);
      setFormData({
        ...formData,
        smr_bir_rdo_number: selectedRDO.rdo_code,
        smr_bir_rdo_address: selectedRDO.rdo_address,
        smr_bir_rdo_city: selectedRDO.rdo_city,
      });
    };

    //for Report on Non-holding of Annual Stockholders' Meeting
    const handleRnhasmReasonChange = (e) => {
      const selectedRNHASMReason = rnhasmReasonOption.find(
        (reason) => reason.value === e
      );
      setFormData({
        ...formData,
        rnhasm_reason: selectedRNHASMReason.value,
      });
    };

    //for Independent Auditor's Report - Stockholders Number
    const handleOnChangeStockholders = (e) => {
      const selectedStockholder = noOfStockholdersOption.find(
        (stockholder) => stockholder.value === e
      );
      setFormData({
        ...formData,
        iar_no_of_stockholders: selectedStockholder.value,
        iar_no_of_stockholders_int:
          selectedStockholder.iar_no_of_stockholders_int,
      });
    };

    const getDocumentForm = () => {
      switch (formData.type) {
        case "Certificate of Gross Sales/Receipts":
          return (
            <CGRForm
              formData={formData}
              errors={errors}
              handleOnChange={handleOnChange}
              officersOption={officersOption}
              selectedOfficer={selectedOfficer}
              handleOnChangeAppointees={handleOnChangeAppointees}
            />
          );
        case "Affidavit of Non-Operation":
          return (
            <AffidavitOfNonOperationForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleOnChange={handleOnChange}
              officersOption={officersOption}
              selectedOfficer={selectedOfficer}
              handleOnChangeAppointees={handleOnChangeAppointees}
            />
          );
        case "Affidavit of Loss":
          return (
            <AffidavitOfLossForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleOnChange={handleOnChange}
            />
          );

        case "Cover Sheet for Audited Financial Statements":
          return (
            <CoverSheetforAFSForm
              formData={formData}
              handleOnChange={handleOnChange}
              coverSheetDepartmentOption={coverSheetDepartmentOption}
              handleOnChangeDepartment={handleOnChangeDepartment}
            />
          );
        case "SMR for BIR and SEC":
          return (
            <SMRForm
              formData={formData}
              handleOnChange={handleOnChange}
              rdoAddressOption={rdoAddressOption}
              handleRDOChange={handleRDOChange}
            />
          );
        case "SMR for BIR":
          return (
            <SMR_BIRForm
              formData={formData}
              handleOnChange={handleOnChange}
              rdoAddressOption={rdoAddressOption}
              handleRDOBIRChange={handleRDOBIRChange}
            />
          );
        case "SMR for SEC":
          return (
            <SMR_SECForm
              formData={formData}
              handleOnChange={handleOnChange}
              rdoAddressOption={rdoAddressOption}
            />
          );
        case "Waiver of Notice":
          return (
            <WaiverOfNoticeForm
              formData={formData}
              setFormData={setFormData}
              handleOnChange={handleOnChange}
            />
          );
        case "Notice of Meeting":
          return (
            <NoticeOfMeeting
              formData={formData}
              setFormData={setFormData}
              handleOnChange={handleOnChange}
            />
          );
        case "Report on Non-holding of Annual Stockholders' Meeting":
          return (
            <RNHASMForm
              formData={formData}
              handleOnChange={handleOnChange}
              rnhasmReasonOption={rnhasmReasonOption}
              handleRnhasmReasonChange={handleRnhasmReasonChange}
            />
          );
        case "Independent Auditor's Report":
          return (
            <IndependentAuditorsForm
              formData={formData}
              handleOnChange={handleOnChange}
              noOfStockholdersOption={noOfStockholdersOption}
              handleOnChangeStockholders={handleOnChangeStockholders}
            />
          );
        case "SPA - Business Renewal":
          return (
            <SPAforBusinessRenewalForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleOnChange={handleOnChange}
              officersOption={officersOption}
              selectedOfficer={selectedOfficer}
              handleOnChangeAppointees={handleOnChangeAppointees}
            />
          );
        case "SECCERT - No Dispute":
          return (
            <SecCertNoDisputeForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleOnChange={handleOnChange}
              officersOption={officersOption}
              selectedOfficer={selectedOfficer}
              handleOnChangeAppointees={handleOnChangeAppointees}
            />
          );

        default:
          return (
            <div>
              <Typography
                variant="small"
                className="font-medium flex flex-col items-center gap-1"
              >
                <HiMiniExclamationTriangle
                  size={25}
                  className="text-orange-400"
                />
                No document type selected.
              </Typography>
              <Typography variant="small" className="text-center">
                Please go back and choose a valid document type before
                proceeding.
              </Typography>
            </div>
          );
      }
    };

    return <div>{getDocumentForm()}</div>;
  };

  // useEffect(() => {
  //   console.log("Document Details anthony: ", formData);
  // }, [formData]);

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="small" className="font-normal text-sm">
        STEP TWO
      </Typography>

      <Typography variant="small" className="font-bold text-md">
        Document Details - {formData.type}
      </Typography>

      <div className="flex flex-col py-5 gap-8">
        {DocumentFormComponent(formData, officers, handleOnChange, setFormData)}
      </div>
    </div>
  );
};
