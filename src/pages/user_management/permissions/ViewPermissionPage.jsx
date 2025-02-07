import React, { useEffect, useState, UseState } from "react";
import { useNavigate, useParams } from "react-router";
import useDrawerStore from "../../../store/useDrawerStore";
import useQuoteStore from "../../../store/useQuoteStore";
import ViewPageComponent from "../../../components/ViewPageComponent";
import usePermissionStore from "../../../store/usePermissionStore";
import ButtonComponent from "../../../components/ButtonComponent";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import DialogComponent from "../../../components/DialogComponent";
import ReviewComponent from "../../../components/ReviewComponent";
import { toast } from "sonner";
import axiosInstance from "../../../utils/axiosHelper";

const ViewPermissionPage = () => {
  const { permission_id } = useParams();

  const { open, setOpen } = useDrawerStore();

  const { permission, setPermission } = usePermissionStore();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const deleteHandlerDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/permission/${permission_id}`);
      if (response.status == 200) {
        setPermission(response.data.permission[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ViewPageComponent
        items={[
          { title: "Permissions", goto: "/permissions" },
          {
            title: permission.permission_name,
            goto: `/permission/view/${permission_id}`,
          },
        ]}
        title={permission.permission_name}
        sideButtonComponent={
          <div className="flex w-max flex-row gap-2">
            <Menu>
              <MenuHandler>
                <Button
                  variant="outlined"
                  className="bg-transparent border-light-gray"
                  size="sm"
                >
                  <HiOutlineEllipsisHorizontal />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className="text-dark"
                  onClick={() => {
                    setPermission(permission);
                    navigate(`/permissions/update/${permission_id}`);
                  }}
                >
                  Edit Details
                </MenuItem>
                <hr className="my-1 text-light-gray" />
                <MenuItem onClick={deleteHandlerDialog}>
                  <span className="text-red-400">Delete</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        }
      >
        <ReviewComponent
          title="Permission Information"
          data={[
            {
              name: "Permission Name",
              value: permission.permission_name,
            },
          ]}
        />
      </ViewPageComponent>

      <DialogComponent
        dialogName={deleteDialog}
        handlerDialog={deleteHandlerDialog}
        title={`Delete Permission`}
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={deleteHandlerDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={async () => {
                try {
                  const response = await axiosInstance.delete(
                    `/permission/${permission.permission_id}`
                  );
                  if (response.status == 200) {
                    toast.success("The record was deleted successfully.");
                    navigate("/permissions");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error("There was an error deleting the record");
                } finally {
                  deleteHandlerDialog();
                }
              }}
            >
              Yes
            </ButtonComponent>
          </div>
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure? This action cannot be undone.
        </Typography>
      </DialogComponent>
    </>
  );
};

export default ViewPermissionPage;
