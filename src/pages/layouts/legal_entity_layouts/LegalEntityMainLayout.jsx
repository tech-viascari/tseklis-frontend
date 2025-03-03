import React from "react";
import LegalEntitySideBar from "./LegalEntitySideBar";
import { Outlet } from "react-router";

const LegalEntityMainLayout = () => {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-row max-w-[2560px] min-w-[320px] h-screen w-full justify-center">
        {<LegalEntitySideBar />}
        <div
          className={`bg-white w-full min-w-[240px] max-w-[2560px] flex flex-col items-center`}
        >
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalEntityMainLayout;
