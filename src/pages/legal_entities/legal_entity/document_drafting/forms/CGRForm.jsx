import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import { Typography } from "@material-tailwind/react";
import { formatNumberWithCommaAndDecimal } from "../../../../../utils/global";
import SelectComponent from "../../../../../components/SelectComponent";

const CGRForm = ({
  formData,
  errors,
  handleOnChange,
  officersOption,
  selectedOfficer,
  handleOnChangeAppointees,
}) => {
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

export default CGRForm;
