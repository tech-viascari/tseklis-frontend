import { Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
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
  const inputRef = useRef(null);

  // Function to prevent arrow keys and mouse wheel
  const handleKeyDown = (event) => {
    if (type != "number") return;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault(); // Prevent default behavior (changing value)
    }
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent the default scroll behavior on number input
  };

  useEffect(() => {
    if (type != "number") return;

    const inputElement = inputRef.current;

    // Attach the event listener to the input element with passive: false
    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

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
          ref={inputRef}
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
          onKeyDown={handleKeyDown}
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
