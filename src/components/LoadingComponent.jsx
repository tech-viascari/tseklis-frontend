import { Spinner } from "@material-tailwind/react";
import React from "react";

const LoadingComponent = ({ open, loadingHandlerDialog = () => {} }) => {
  return (
    <div>
      <dialog
        open={open}
        onClick={loadingHandlerDialog}
        className="w-full bg-black/70 z-20 h-screen absolute top-0"
      >
        <div className="flex flex-row justify-center items-center h-full">
          <Spinner color="teal" className="text-white w-8 h-8"></Spinner>
        </div>
      </dialog>
    </div>
  );
};

export default LoadingComponent;
