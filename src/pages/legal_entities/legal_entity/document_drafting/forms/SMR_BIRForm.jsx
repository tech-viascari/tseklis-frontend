import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import { Checkbox, Input, Typography } from "@material-tailwind/react";
import SelectComponent from "../../../../../components/SelectComponent";

export const SMR_BIRForm = ({
  formData,
  handleOnChange,
  rdoAddressOption,
  handleRDOBIRChange,
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

        <div className="flex flex-row gap-3 items-end ">
          <div className="flex flex-col gap-1 w-full">
            <Typography variant="small" className="mb-1 font-normal">
              Current Year Audited <span className="text-red-400">*</span>
            </Typography>
            <Input
              name="smr_bir_year_audited"
              value={formData.smr_bir_year_audited}
              onChange={handleOnChange}
            />
          </div>

          <Checkbox
            color="teal"
            label="Comparative?"
            className="text-sm"
            onChange={() => {
              handleOnChange({
                target: {
                  name: "smr_bir_year_audited",
                  value:
                    formData.smr_bir_year_audited ===
                    "December 31, 2024 and 2023"
                      ? "December 31, 2024"
                      : "December 31, 2024 and 2023",
                },
              });
            }}
            checked={
              formData.smr_bir_year_audited === "December 31, 2024 and 2023"
            }
          />
        </div>

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
          value={formData.smr_bir_rdo_number}
          onSelectChange={handleRDOBIRChange}
        />

        <InputComponent
          label="RDO Address"
          required
          name="smr_bir_rdo_address"
          value={formData.smr_bir_rdo_address}
          onChange={handleOnChange}
        />

        <InputComponent
          label="RDO (District / City) / Province"
          required
          name="smr_bir_rdo_city"
          value={formData.smr_bir_rdo_city}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};
