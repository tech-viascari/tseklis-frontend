import React from "react";
import useDrawerStore from "../store/useDrawerStore";
import TopBar from "../pages/layouts/TopBar";
import {
  Typography,
} from "@material-tailwind/react";


const ViewPageComponent = ({
  children,
  items = [],
  title = "",
  subtitle = "",
  sideButtonComponent,
}) => {
  const { open, setOpen } = useDrawerStore();

  return (
    <div className="w-full relative">
      <TopBar items={items} />

      <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
        <div className="pt-[60px]">
          <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row gap-8">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      {title}
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      {subtitle}
                    </Typography>
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-row gap-3">{sideButtonComponent}</div>
              </div>
              <div className="flex-1 h-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPageComponent;
