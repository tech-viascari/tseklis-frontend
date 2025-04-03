import React from "react";
import { pageAccessDenied, pageNotFoundSVG } from "./GetIcons";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import ButtonComponent from "./ButtonComponent";
import { HiArrowTurnDownLeft, HiHome } from "react-icons/hi2";

const PageDeniedComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-3">
          <div>{pageAccessDenied}</div>
          <Typography className="w-full md:w-1/2 text-center text-md font-semibold">
            Access Denied
          </Typography>
          <Typography className="w-full md:w-1/2 text-center text-sm font-normal">
            Sorry, you do not have permission to view this page. If you believe
            this is a mistake, please contact support.
          </Typography>
          <div className="flex flex-row  justify-center items-center gap-1 w-full md:w-1/2 text-center text-sm font-normal">
            <ButtonComponent
              variant="text"
              className="bg-transparent hover:bg-primary"
              onClick={() => navigate("/")}
            >
              <HiHome size={20} />
            </ButtonComponent>
            <ButtonComponent
              variant="outlined"
              className="bg-transparent hover:bg-primary"
              onClick={() => navigate(-1)}
            >
              <HiArrowTurnDownLeft />
            </ButtonComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageDeniedComponent;
