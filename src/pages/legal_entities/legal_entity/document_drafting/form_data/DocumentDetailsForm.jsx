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

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="small" className="font-normal text-sm">
        STEP TWO
      </Typography>

      <Typography variant="small" className="font-bold text-md">
        Document Details
      </Typography>

      <div className="flex flex-col py-5 gap-8">
        {DocumentFormComponent(formData, officers, handleOnChange, setFormData)}
      </div>
    </div>
  );
};
