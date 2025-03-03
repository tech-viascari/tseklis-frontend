import React, { useEffect, useState } from "react";
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
import useUserStore from "../../../store/useUserStore";
import moment from "moment";

const ViewUsersPage = () => {
  const { user_id } = useParams();

  const { open, setOpen } = useDrawerStore();

  const { user, setUser, getPermissions } = useUserStore();

  const [deleteDialog, setDeleteDialog] = useState(false);

  const deleteHandlerDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${user_id}`);
        if (response.status == 200) {
          setUser(response.data.user);
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
          { title: "Users", goto: "/users" },
          {
            title: `${user.first_name} ${user.last_name}`,
            goto: `/user/view/${user_id}`,
          },
        ]}
        title={`${user.first_name} ${user.last_name}`}
        subtitle={user.email}
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
                    setUser(user);
                    navigate(`/users/update/${user_id}`);
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
            title="User Information"
            data={[
              {
                name: "Name",
                value: `${user.first_name}${
                  user.middle_name && ` ${user.middle_name[0]}.`
                } ${user.last_name}`,
              },
              {
                name: "Email",
                value: user.email,
              },
              {
                name: "Slack ID",
                value: user.slack_id,
              },
              {
                name: "Status",
                value: user.status,
              },
              {
                name: "Last Login",
                value: moment(user.last_login).format("MMM DD, YYYY hh:mm A"),
              },
            ]}
          />
          <ReviewComponent
            title=""
            data={[
              {
                name: "Role",
                value: user.roles.length != 0 && user.roles[0].role_name,
              },
            ]}
          />
          <ReviewComponent
            title=""
            data={[
              {
                name: "Permissions",
                value: getPermissions(user.permissions).join(", "),
              },
            ]}
          />
        </div>
      </ViewPageComponent>

      <DialogComponent
        dialogName={deleteDialog}
        handlerDialog={deleteHandlerDialog}
        title={`Delete user`}
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
                    `/user/${user.user_id}`
                  );
                  if (response.status == 200) {
                    toast.success("The record was deleted successfully.");
                    navigate("/users");
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

export default ViewUsersPage;
