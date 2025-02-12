import React, { useEffect, useState, UseState } from "react";
import { useNavigate, useParams } from "react-router";
import useDrawerStore from "../../../store/useDrawerStore";
import ViewPageComponent from "../../../components/ViewPageComponent";
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
import useRoleStore from "../../../store/useRoleStore";

const ViewRolePage = () => {
  const { role_id } = useParams();

  const { open, setOpen } = useDrawerStore();

  const { role, setRole } = useRoleStore();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const deleteHandlerDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/role/${role_id}`);
        if (response.status == 200) {
          setRole(response.data.role);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ViewPageComponent
        items={[
          { title: "Roles", goto: "/roles" },
          {
            title: role.role_name,
            goto: `/role/view/${role_id}`,
          },
        ]}
        title={role.role_name}
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
                    setRole(role);
                    navigate(`/roles/update/${role_id}`);
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
        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="Role Information"
            data={[
              {
                name: "Role Name",
                value: role.role_name,
              },
            ]}
          />
          <ReviewComponent
            title=""
            data={[
              {
                name: "Permissions",
                value: role.permissions
                  .map((permission) => permission.permission_name)
                  .join(", "),
              },
            ]}
          />
        </div>
      </ViewPageComponent>

      <DialogComponent
        dialogName={deleteDialog}
        handlerDialog={deleteHandlerDialog}
        title={`Delete role`}
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
                    `/role/${role.role_id}`
                  );
                  if (response.status == 200) {
                    toast.success("The record was deleted successfully.");
                    navigate("/roles");
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

export default ViewRolePage;
