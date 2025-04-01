import React, { useEffect } from "react";
import UnderConstructionComponent from "../../components/UnderConstructionComponent";
import MainContent from "../layouts/MainContent";
import { setDocumentTitle } from "../../utils/global";

const DashboardPage = () => {
  
  setDocumentTitle("Dashboard");

  return (
    <MainContent items={[{ title: "Dashboard", goto: "/" }]}>
      <div className="h-screen p-5 flex flex-col items-center justify-center -mt-[60px] gap-3">
        <UnderConstructionComponent />
      </div>
    </MainContent>
  );
};

export default DashboardPage;
