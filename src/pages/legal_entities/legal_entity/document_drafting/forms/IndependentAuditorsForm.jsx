import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import { Checkbox, Typography, Input } from "@material-tailwind/react";
import SelectComponent from "../../../../../components/SelectComponent";

export const IndependentAuditorsForm = ({
  formData,
  handleOnChange,
  noOfStockholdersOption,
  handleOnChangeStockholders,
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
          label="Office Address"
          required
          name="office_address"
          value={formData.office_address}
          onChange={handleOnChange}
        />

        <div className="flex flex-row gap-3 items-end ">
          <div className="flex flex-col gap-1 w-full">
            <Typography variant="small" className="mb-1 font-normal">
              Financial Year Ended <span className="text-red-400">*</span>
            </Typography>
            <Input
              name="iar_financial_position_date"
              value={formData.iar_financial_position_date}
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
                  name: "iar_financial_position_date",
                  value:
                    formData.iar_financial_position_date ===
                    "December 31, 2024 and 2023"
                      ? "December 31, 2024"
                      : "December 31, 2024 and 2023",
                },
              });
            }}
            checked={
              formData.iar_financial_position_date ===
              "December 31, 2024 and 2023"
            }
          />
        </div>

        <SelectComponent
          label="Number of Stockholders"
          required
          options={noOfStockholdersOption}
          onSelectChange={handleOnChangeStockholders}
        />

        <InputComponent
          label="Number of Stockholders (in words)"
          required
          name="iar_no_of_stockholders"
          value={formData.iar_no_of_stockholders}
          onChange={handleOnChange}
          disabled
        />

        <InputComponent
          label="Number of Stockholders (in integer)"
          required
          name="iar_no_of_stockholders_int"
          value={formData.iar_no_of_stockholders_int}
          onChange={handleOnChange}
          disabled
        />
      </div>
    </>
  );
};
