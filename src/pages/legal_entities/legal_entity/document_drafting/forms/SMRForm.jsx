import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import SelectComponent from "../../../../../components/SelectComponent";

export const SMRForm = ({ formData, handleOnChange, rdoAddressOption, handleRDOChange }) => {
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
          label="Audited Years in Question"
          required
          name="audited_years_in_question"
          value={formData.audited_years_in_question}
          onChange={handleOnChange}
        />

        <InputComponent
          label="President Name"
          required
          name="president_name"
          value={formData.president_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Treasurer's Name"
          required
          name="treasurer_name"
          value={formData.treasurer_name}
          onChange={handleOnChange}
        />

        <SelectComponent
          label="RDO Number"
          options={rdoAddressOption}
          value={formData.rdo_number}
          onSelectChange={handleRDOChange}
        />

        <InputComponent
          label="RDO Address"
          required
          name="rdo_address"
          value={formData.rdo_address}
          onChange={handleOnChange}
        />

        <InputComponent
          label="RDO City"
          required
          name="rdo_city"
          value={formData.rdo_city}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};
