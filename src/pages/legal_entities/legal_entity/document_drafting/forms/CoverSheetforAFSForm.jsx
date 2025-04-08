import { Select, Typography } from "@material-tailwind/react";
import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import SelectComponent from "../../../../../components/SelectComponent";

export const CoverSheetforAFSForm = ({
  formData,
  setFormData,
  errors,
  handleOnChange,
  officersOption,
  selectedOfficer,
  handleOnChangeAppointees,
}) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <InputComponent
          label="SEC Registration Number"
          required
          name="sec_registration_number"
          value={formData.sec_registration_number}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Company Name"
          required
          name="corporate_name"
          value={formData.corporate_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Principal Office"
          required
          name="office_address"
          value={formData.office_address}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Form Type"
          required
          name="form_type"
          value={formData.form_type}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Department Requiring the Report"
          required
          name="department"
          value={formData.department}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Secondary License"
          required
          name="secondary_license"
          value={formData.secondary_license}
          onChange={handleOnChange}
        />

        <Typography variant="small" className="mt-5 font-medium">
          Company Information
        </Typography>

        <InputComponent
          label="Email Address"
          required
          name="official_email_address"
          value={formData.official_email_address}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Telephone Number"
          required
          name="telephone_number"
          value={formData.telephone_number}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Mobile Number"
          required
          name="official_mobile_number"
          value={formData.official_mobile_number}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Number of Shareholders"
          required
          name="number_of_shareholders"
          value={formData.number_of_shareholders}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Annual Meeting"
          required
          name="date_of_annual_meeting"
          value={formData.date_of_annual_meeting}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Fiscal Year"
          required
          name="fiscal_year_end"
          value={formData.fiscal_year_end}
          onChange={handleOnChange}
        />

        <Typography variant="small" className="mt-5 font-medium">
          Contact Person Information
        </Typography>

        <InputComponent
          label="Name"
          required
          name="contact_person_name"
          value={formData.contact_person_name}
          onChange={handleOnChange}
        />

        <InputComponent
            label="Email Address"
            required
            name="contact_person_email"
            value={formData.contact_person_email}
            onChange={handleOnChange}
        />

        <InputComponent
            label="Telephone Number"
            required
            name="contact_person_telephone_number"
            value={formData.contact_person_telephone_number}
            onChange={handleOnChange}
        />

        <InputComponent
            label="Mobile Number"
            required
            name="contact_person_mobile_number"
            value={formData.contact_person_mobile_number}
            onChange={handleOnChange}
        />

        <InputComponent
            label="Address"
            required
            name="contact_person_address"
            value={formData.contact_person_address}
            onChange={handleOnChange}
        />
      </div>
    </>
  );
};
