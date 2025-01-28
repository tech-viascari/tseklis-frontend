import { Option, Select, Typography } from "@material-tailwind/react";
import React from "react";
import { HiMiniExclamationTriangle } from "react-icons/hi2";

const SelectComponent = ({
  label = "",
  error_message = "",
  name,
  value,
  onSelectChange,
  required,
  labelClass = "",
  options = [],
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Typography
          variant="small"
          className={`mb-1 font-normal ${labelClass}`}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </Typography>
        <Select
          onChange={onSelectChange}
          name={name}
          value={value}
          className="!border-light-gray focus:!border-light-gray text-dark"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          error={true}
        >
          {options.map((option, index) => {
            return (
              <Option key={`${option.name}-${index}`} value={option.value}>
                {option.name}
              </Option>
            );
          })}
        </Select>
        {error_message && (
          <label className="text-xs text-red-500 flex flex-row gap-1 items-center">
            <HiMiniExclamationTriangle size={15} />
            {error_message}
          </label>
        )}
      </div>
    </>
  );
};

export default SelectComponent;
