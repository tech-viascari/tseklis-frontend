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

const TimelineComponent = ({ timelines = [] }) => {
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
                <TimelineIcon className="bg-secondary" />
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
                <Typography
                  variant="small"
                  color="black"
                  className="font-normal text-gray mt-2"
                >
                  {timeline.description}
                </Typography>
              </TimelineBody>
            </TimelineItem>
          ))}
        </>
      )}
    </Timeline>
  );
};

export default TimelineComponent;
