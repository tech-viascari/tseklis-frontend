import React from "react";
import UnderConstructionComponent from "../../components/UnderConstructionComponent";
import MainContent from "../layouts/MainContent";

const UsersPage = () => {
  return (
    <MainContent items={[{ title: "Users", goto: "/users" }]}>
      <div className="h-screen p-5 flex flex-col items-center justify-center -mt-[60px] gap-3">
        <UnderConstructionComponent />
      </div>
    </MainContent>
  );
};

export default UsersPage;
