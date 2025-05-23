import { Typography } from "@material-tailwind/react";
import React from "react";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import Select from "react-select";

const SelectMultipleComponent = ({
  label = "",
  error_message = "",
  name,
  value,
  onSelectChange,
  required,
  labelClass = "",
  options = [],
  isMulti = false,
  defaultValue,
  closeMenuOnSelect = false,
  menuPortalTarget = null,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "7px", // Change this value to your desired border radius
      borderColor: "#D9D9D9", // Optional: customize border color
      boxShadow: "none", // Optional: remove default box shadow
      "&:hover": {
        borderColor: "#D9D9D9", // Optional: change border color on hover
        border: "2px solid #D9D9D9", // Optional: change border color on hover
      },
    }),
  };
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
          options={options}
          onChange={onSelectChange}
          styles={customStyles}
          closeMenuOnSelect={closeMenuOnSelect}
          isMulti={isMulti}
          name={name}
          value={value}
          defaultValue={defaultValue}
          menuPortalTarget={menuPortalTarget}
        />
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

export default SelectMultipleComponent;
