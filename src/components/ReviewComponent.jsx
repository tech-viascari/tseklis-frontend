import { Typography } from "@material-tailwind/react";
import React from "react";

const ReviewComponent = ({ title, data }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="small" className="font-semibold text-sm">
        {title}
      </Typography>
      <hr className="border-light-gray" />
      <div className="flex flex-col gap-2">
        {data.map((row, index) => {
          return (
            <div key={`${row.name}-${index}`} className="flex flex-row">
              <div className="w-80">
                <Typography variant="small" className="font-medium text-sm">
                  {row.name}
                </Typography>
              </div>
              <div className="w-full">
                <Typography variant="small" className="font-normal text-sm">
                  {row.value}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewComponent;
