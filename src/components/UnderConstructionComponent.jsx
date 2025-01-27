import React from "react";
import { underConstructionSVG } from "./GetIcons";
import { Typography } from "@material-tailwind/react";

const UnderConstructionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {underConstructionSVG}
      <Typography className="w-full md:w-1/2 text-center text-md font-semibold">
        This Page is Under Development
      </Typography>
      <Typography className="w-full md:w-1/2 text-center text-sm font-normal">
        Thank you for visiting! This page is currently under development and
        will be available soon. We appreciate your patience and understanding.
        Please check back later for updates.
      </Typography>
    </div>
  );
};

export default UnderConstructionComponent;
