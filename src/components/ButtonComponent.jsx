import { Button } from "@material-tailwind/react";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ButtonComponent = ({
  children,
  className,
  type = "button",
  onClick = () => {},
  disabled = false,
  loading = false,
  variant = "filled",
}) => {
  return (
    <>
      <Button
        variant={variant}
        size="sm"
        className={` shadow-none hover:shadow-sm normal-case font-medium text-sm border-light-gray focus:!border-light-gray ${
          className || "bg-primary text-secondary"
        } `}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <div className="flex flex-row gap-2 items-center">
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          {children}
        </div>
      </Button>
    </>
  );
};

export default ButtonComponent;
