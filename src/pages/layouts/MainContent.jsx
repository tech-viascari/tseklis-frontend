import React from "react";
import TopBar from "./TopBar";
import useDrawerStore from "../../store/useDrawerStore";

const MainContent = ({ children, items }) => {
  const { open } = useDrawerStore();

  return (
    <div className="w-full h-screen">
      <TopBar items={items} />

      <div className={`${open ? "pl-64" : "pl-20"} z-0 h-full grid grid-cols-1`}>
        <div className="pt-[60px]">
          <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
