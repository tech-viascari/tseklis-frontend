import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import SelectComponent from "../../../../../components/SelectComponent";
import useDocumentDraftingStore from "../../../../../store/useDocumentDraftingStore";
import { formatNumberWithCommaAndDecimal } from "../../../../../utils/global";

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

    const CGRForm = () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <InputComponent
              label="Year"
              required
              name="year"
              value={formData.year}
              error_message={errors.year}
              onChange={(e) => {
                handleOnChange(e, "Year");
              }}
            />
            <InputComponent
              label="Date From"
              required
              type="date"
              name="date_from"
              value={formData.date_from}
              onChange={handleOnChange}
            />
            <InputComponent
              label="Date To"
              required
              type="date"
              name="date_to"
              value={formData.date_to}
              onChange={handleOnChange}
            />
          </div>

          <InputComponent
            label="Office Address"
            required
            name="office_address"
            value={formData.office_address}
            onChange={handleOnChange}
          />

          <Typography variant="small" className={`mt-5 font-medium`}>
            Revenue Generated
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-3 w-full ">
            <InputComponent
              label={`Q1 ${formData.year}`}
              required
              name="revenue_q1"
              value={formData.revenue_q1}
              onChange={handleOnChange}
            />
            <InputComponent
              label={`Q2 ${formData.year}`}
              required
              name="revenue_q2"
              value={formData.revenue_q2}
              onChange={handleOnChange}
            />
            <InputComponent
              label={`Q3 ${formData.year}`}
              required
              name="revenue_q3"
              value={formData.revenue_q3}
              onChange={handleOnChange}
            />
            <InputComponent
              label={`Q4 ${formData.year}`}
              required
              name="revenue_q4"
              value={formData.revenue_q4}
              onChange={handleOnChange}
            />
          </div>
          {formData.total_revenue != 0 && (
            <div>
              <Typography variant="small" className={`font-medium`}>
                Total Revenue: PHP{" "}
                {formatNumberWithCommaAndDecimal(formData.total_revenue)}
              </Typography>
            </div>
          )}

          <Typography variant="small" className={`mt-5 font-medium`}>
            Signatory
          </Typography>

          <div className="flex flex-col gap-3">
            <div>
              <SelectComponent
                label="Officer"
                options={officersOption}
                value={selectedOfficer}
                onSelectChange={handleOnChangeAppointees}
              />
            </div>
            <div className="flex flex-col gap-3">
              <InputComponent
                label="Officer Name"
                required
                name="officer_name"
                value={formData.officer_name}
                onChange={handleOnChange}
              />
              <InputComponent
                label="Officer Position"
                required
                name="officer_position"
                value={formData.officer_position}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      );
    };

    const SPABusinessPermitRenewal = () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <InputComponent
              label="Year"
              required
              name="year"
              value={formData.year}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex flex-row justify-between items-center w-full bg-red-500">
            <Typography variant="small" className="font-medium">
              Appointees
            </Typography>
            <ButtonComponent
              onClick={() => {
                // console.log(document_state.appointeeState);
                console.log(formData);
              }}
            >
              Add row
            </ButtonComponent>
          </div>

          <div className="flex flex-col gap-3">
            <table className="w-full overflow-x-auto">
              <thead>
                <tr>
                  <th className="text-start w-[35%]">
                    <Typography variant="small" className="mb-1 font-normal">
                      Name
                    </Typography>
                  </th>
                  <th className="text-start w-[35%]">
                    <Typography variant="small" className="mb-1 font-normal">
                      ID Number
                    </Typography>
                  </th>
                  <th className="text-start w-[35%]">
                    <Typography variant="small" className="mb-1 font-normal">
                      Date and Place Issued
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InputComponent
                      name="officer_name"
                      value={formData.officer_name}
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <InputComponent
                      name="officer_name"
                      value={formData.officer_name}
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <InputComponent
                      name="officer_name"
                      value={formData.officer_name}
                      onChange={onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputComponent
                      name="officer_name"
                      value={formData.officer_name}
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <InputComponent
                      name="officer_name"
                      value={formData.officer_name}
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <InputComponent
                      name="officer_name"
                      value={formData.officer_name}
                      onChange={onChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography variant="small" className={`mt-5 font-medium`}>
            Signatory
          </Typography>

          <div className="flex flex-col gap-3">
            <div>
              <SelectComponent
                label="Officer"
                options={officer}
                value={selectedOfficer}
                onSelectChange={onSelectChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <InputComponent
                label="Officer Name"
                required
                name="officer_name"
                value={formData.officer_name}
                onChange={onChange}
              />
              <InputComponent
                label="Officer Position"
                required
                name="officer_position"
                value={formData.officer_position}
                onChange={onChange}
              />
              <InputComponent
                label="Officer Nationality"
                required
                name="officer_position"
                value={formData.officer_position}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      );
    };

    return <div>{CGRForm()}</div>;
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
