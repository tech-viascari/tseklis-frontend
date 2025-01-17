import React from "react";

const ButtonComponent = ({ type = "button", text, onClick = () => {} }) => {
  return (
    <>
      <button
        className="py-2 rounded-md text-[12px] bg-primary text-secondary font-semibold"
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonComponent;
