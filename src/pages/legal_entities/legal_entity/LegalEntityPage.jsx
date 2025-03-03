import React from "react";
import TopBar from "../../layouts/TopBar";
import { Typography } from "@material-tailwind/react";
import ButtonComponent from "../../../components/ButtonComponent";
import useDrawerStore from "../../../store/useDrawerStore";

const LegalEntityPage = () => {
  const { open, setOpen } = useDrawerStore();
  return (
    <>
      <div className="w-full relative">
        <TopBar
          items={[{ title: "Legal Entities", goto: "/legal-entities" }]}
        />
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Legal Entities
                    </Typography>
                    <Typography variant="small" className="font-normal text-sm">
                      Here's the list of companies across various categories.
                    </Typography>
                  </div>
                  <div>
                    <ButtonComponent
                      onClick={() => {
                        navigate("/legal-entities/add-new");
                      }}
                    >
                      Add new
                    </ButtonComponent>
                  </div>
                </div>
                <div className="flex-1 h-full">
                  <div className="flex flex-col gap-5 h-full">
                    <Typography
                      variant="small"
                      className="font-semibold text-sm"
                    >
                      Viascari Group of Companies
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalEntityPage;
