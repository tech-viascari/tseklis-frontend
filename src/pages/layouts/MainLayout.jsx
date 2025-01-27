import React from "react";
import { Outlet } from "react-router";
import MainSideBar from "./sidebars/MainSideBar";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="flex flex-row max-w-[2560px] min-w-[320px] h-screen w-full justify-center">
          {<MainSideBar />}
          <div
            className={`bg-white w-full min-w-[240px] max-w-[1440px] flex flex-col items-center`}
          >
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
