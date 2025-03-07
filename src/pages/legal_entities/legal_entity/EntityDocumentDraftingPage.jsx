import React from "react";
import TopBar from "../../layouts/TopBar";
import { Typography } from "@material-tailwind/react";
import useDrawerStore from "../../../store/useDrawerStore";
import { useParams } from "react-router";
import useLegalEntities from "../../../store/useLegalEntities";

const EntityDocumentDraftingPage = () => {
  const { open, setOpen } = useDrawerStore();
  const { entity_id } = useParams();
  const { states, entity } = useLegalEntities();

  return (
    <>
      <div className="w-full relative">
        <TopBar
          items={[
            {
              title: entity.entity_details.company_name,
              goto: `/legal-entities/v/${entity_id}/`,
            },
            {
              title: "Document Drafting",
              goto: `/legal-entities/v/${entity_id}/document-drafting`,
            },
          ]}
        />
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      Document Drafting
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

export default EntityDocumentDraftingPage;
