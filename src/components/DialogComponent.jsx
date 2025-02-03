import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ButtonComponent from "./ButtonComponent";
import { PiXCircleThin } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";

const DialogComponent = ({
  dialogName,
  title = "",
  handlerDialog,
  size = "sm",
  children,
  hideHeader = false,
  hideFooter = false,
  footerContent,
}) => {
  return (
    <Dialog open={dialogName} handler={handlerDialog} size={size}>
      {!hideHeader && (
        <DialogHeader>
          <div className="flex flex-row justify-between items-center w-full">
            <Typography variant="small" className="font-bold text-base">
              {title}
            </Typography>

            <IconButton
              variant="text"
              className="hover:bg-red-400 hover:text-white rounded-full  w-6 h-6 p-1"
              onClick={handlerDialog}
            >
              <HiMiniXMark size={15} />
            </IconButton>
          </div>
        </DialogHeader>
      )}
      {!hideHeader && <hr className="border-light-gray" />}
      <DialogBody className="text-dark overflow-y-auto max-h-[70vh]">
        <div className="flex flex-col gap-2">{children}</div>
      </DialogBody>
      {!hideFooter && <DialogFooter>{footerContent}</DialogFooter>}
    </Dialog>
  );
};

export default DialogComponent;
