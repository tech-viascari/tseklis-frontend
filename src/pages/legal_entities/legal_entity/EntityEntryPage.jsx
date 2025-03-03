import React, { useEffect, useState } from "react";
import TopBar from "../../layouts/TopBar";
import { Typography } from "@material-tailwind/react";
import useDrawerStore from "../../../store/useDrawerStore";

const EntityEntryPage = () => {
  const { open, setOpen } = useDrawerStore();

  const [title, setTitle] = useState("");
  const [active, setActive] = useState("/");

  useEffect(() => {
    const params = window.location.pathname.split("/");

    if (params.length > 4) {
      let title = "";
      params[4].split("-").forEach((word) => {
        title += " " + word[0].toUpperCase() + word.slice(1);
        setTitle((prev) => prev + " " + word[0].toUpperCase() + word.slice(1));
      });
      setTitle(title);
    }
  }, [active]);
  return (
    <>
      <div className="w-full relative">
        <TopBar items={[{ title: title, goto: "/legal-entities" }]} />
        <div className={`${open ? "pl-64" : "pl-20"} z-0`}>
          <div className="pt-[60px]">
            <div className="h-full p-5 md:px-12 grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Typography variant="small" className="font-bold text-xl">
                      {title}
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

export default EntityEntryPage;
