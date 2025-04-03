import {
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { getName } from "../utils/global";
import moment from "moment";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router";

const TimelineComponent = ({
  timelines = [],
  goto = () => {},
  showUpdate = false,
}) => {
  return (
    <Timeline>
      {timelines.length == 0 ? (
        <Typography variant="h6" color="black" className="text-center">
          No status trail available.
        </Typography>
      ) : (
        <>
          {timelines.map((timeline, index) => (
            <TimelineItem key={`timeline-${index}`}>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon
                  className={`${
                    timeline.title == "Reverted" ? "bg-red-500" : "bg-secondary"
                  }`}
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  {timeline.title}
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="black"
                  className="font-normal text-gray"
                >
                  {moment(timeline.date).format("MMMM DD, YYYY hh:mm A")}
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className="font-normal text-gray italic"
                >
                  {getName(timeline.name)}
                </Typography>

                <div className="px-2 border-l-4 border-light-gray my-3">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-normal text-black/70 my-2"
                  >
                    {timeline.description}
                  </Typography>
                </div>

                {timeline.title == "Reverted" && index == 0 && (
                  <div>
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal text-black/70 my-2 text-xs py-2"
                    >
                      <span className=" font-bold">Note:</span> Please update
                      the record and ensure that all information is correct and
                      included before re-submitting the file.
                    </Typography>

                    {showUpdate && (
                      <ButtonComponent
                        className="px-2 py-1 bg-transparent border text-black/60"
                        onClick={goto}
                      >
                        Update Details
                      </ButtonComponent>
                    )}
                  </div>
                )}

                {timeline.action_component && timeline.action_component}
              </TimelineBody>
            </TimelineItem>
          ))}
        </>
      )}
    </Timeline>
  );
};

export default TimelineComponent;
