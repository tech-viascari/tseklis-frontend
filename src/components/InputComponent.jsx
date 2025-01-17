import React from "react";

const InputComponent = ({
  label = "",
  error_message = "",
  type,
  placeholder = "",
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 border border-gray rounded-[5px] text-xs"
        />
        {error_message && (
          <label className="text-xs text-red-500">{error_message}</label>
        )}
      </div>
    </>
  );
};

export default InputComponent;
