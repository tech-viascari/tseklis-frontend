import { Avatar, Tooltip, Typography } from "@material-tailwind/react";
import React from "react";

const AssigneeAvatarComponent = ({ assignees, size = "xs" }) => {
  return (
    <div className="flex items-center -space-x-2">
      {assignees.map((assignee, index) => {
        let numberOfAssignee = "";

        if (assignees.length - 5 >= 10) {
          numberOfAssignee = `9+`;
        } else {
          numberOfAssignee = `+${assignees.length - 5}`;
        }

        if (index > 5) return;

        if (index > 4) {
          return (
            <div
              key={assignee.user_id}
              className="z-0 w-6 h-6 bg-light-gray border-white border text-black rounded-full hover:z-10 focus:z-10 flex flex-col items-center justify-center"
            >
              <Typography variant="small" className="text-sm font-medium">
                {numberOfAssignee}
              </Typography>
            </div>
          );
        }

        return (
          <Tooltip content={assignee.name} key={assignee.user_id}>
            <Avatar
              key={assignee.user_id}
              variant="circular"
              alt={assignee.name}
              size={size}
              className="border-[1px] border-white hover:z-10 focus:z-10"
              src={assignee.picture}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export default AssigneeAvatarComponent;
