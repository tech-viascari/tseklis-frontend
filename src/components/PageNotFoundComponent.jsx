import React from "react";
import { underConstructionSVG } from "./GetIcons";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router";
import ButtonComponent from "./ButtonComponent";
import { BiHome } from "react-icons/bi";
import { HiArrowTurnDownLeft, HiHome } from "react-icons/hi2";

const PageNotFoundComponent = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-3">
          {underConstructionSVG}
          <Typography className="w-full md:w-1/2 text-center text-md font-semibold">
            Oops! Page Not Found.
          </Typography>
          <Typography className="w-full md:w-1/2 text-center text-sm font-normal">
            Sorry, but the page you're looking for doesn't seem to exist. It
            might have been moved or deleted. If you believe this is a mistake,
            feel free to contact us.
          </Typography>
          <div className="flex flex-row  justify-center items-center gap-1 w-full md:w-1/2 text-center text-sm font-normal">
            <ButtonComponent
              variant="text"
              className="bg-transparent hover:bg-primary"
            >
              <HiHome size={20} />
            </ButtonComponent>
            <ButtonComponent
              variant="outlined"
              className="bg-transparent hover:bg-primary"
            >
              <HiArrowTurnDownLeft />
            </ButtonComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFoundComponent;
