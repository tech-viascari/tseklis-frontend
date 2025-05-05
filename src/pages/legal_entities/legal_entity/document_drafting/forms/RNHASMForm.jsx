import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import { Typography, Input, Checkbox } from "@material-tailwind/react";
import SelectComponent from "../../../../../components/SelectComponent";
import TextAreaComponent from "../../../../../components/TextAreaComponent";

export const RNHASMForm = ({
  formData,
  handleOnChange,
  rnhasmReasonOption,
  handleRnhasmReasonChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <InputComponent
          label="Company Name"
          required
          name="corporate_name"
          value={formData.corporate_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="SEC Registration Number"
          required
          name="sec_registration_number"
          value={formData.sec_registration_number}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Date of Annual Meeting"
          required
          name="date_of_annual_meeting"
          value={formData.date_of_annual_meeting}
          onChange={handleOnChange}
        />

        <Typography variant="small" className="mt-5 font-medium">
          Reason for Non-Holding of Annual Stockholders' Meeting
        </Typography>

        <SelectComponent
          label="Select a Reason:"
          required
          name="rnhasm_reason"
          options={rnhasmReasonOption}
          value={formData.rnhasm_reason}
          onSelectChange={handleRnhasmReasonChange}
        />

        <TextAreaComponent
          label="The reason you've selected:"
          required
          name="rnhasm_reason"
          value={formData.rnhasm_reason}
          onChange={handleOnChange}
        />

        <Typography variant="small" className="mt-5 font-medium">
          Corporate Secretary / Authorized Representative Information
        </Typography>

        <InputComponent
          label="Corporate Secretary Name"
          required
          name="corp_sec"
          value={formData.corp_sec}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Official Contact Email"
          required
          name="official_email_address"
          value={formData.official_email_address}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Official Contact Mobile Number"
          required
          name="official_mobile_number"
          value={formData.official_mobile_number}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};
