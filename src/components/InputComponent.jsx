import { Input, Typography } from "@material-tailwind/react";
import React from "react";
import { HiMiniExclamationTriangle } from "react-icons/hi2";

const InputComponent = ({
  label = "",
  error_message = "",
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  required = false,
  labelClass = "",
  disabled = false,
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

        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className=" !border-light-gray focus:!border-light-gray text-dark"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          placeholder={placeholder}
          disabled={disabled}
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

export default InputComponent;
