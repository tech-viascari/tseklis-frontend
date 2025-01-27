import { Button } from "@material-tailwind/react";
import React from "react";

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
        loading={loading}
        className={` shadow-none hover:shadow-sm normal-case font-medium text-sm border-light-gray focus:!border-light-gray ${
          className || "bg-primary text-secondary"
        } `}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonComponent;
