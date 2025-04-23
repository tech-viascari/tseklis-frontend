import React, { useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import { radio, Radio, Typography } from "@material-tailwind/react";
import { ListComponent } from "../../../../../components/ListComponent";

const data = [
  // {
  //   name: "Anthony 123",
  // },
  // {
  //   name: "Anthony 345",
  // },
  // {
  //   name: "Anthony 567",
  // },
  // {
  //   name: "Anthony 789",
  // },
];

export const NoticeOfMeeting = ({ formData, handleOnChange }) => {
  const [radioChange, setRadioChange] = useState("without_proxy");

  return (
    <>
      <div className="flex flex-col gap-3">
        <Typography variant="h6" className={`font-normal`}>
          Please choose whether the meeting is with or without proxy
        </Typography>
        <div className="flex  justify-between">
          <Radio
            name="proxy"
            value={radioChange}
            defaultChecked
            label={
              <Typography variant="small" className={`font-normal`}>
                Without Proxy
              </Typography>
            }
            onChange={() => setRadioChange("without_proxy")}
          />

          <Radio
            name="proxy"
            value={radioChange}
            label={
              <Typography variant="small" className={`font-normal`}>
                With Proxy
              </Typography>
            }
            onChange={() => setRadioChange("with_proxy")}
          />
        </div>

        <InputComponent
          label="Company Name"
          required
          name="corporate_name"
          value={formData.corporate_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Event Name"
          required
          name="nom_event_name"
          value={formData.nom_event_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Event Date"
          required
          name="nom_event_date"
          type="date"
          value={formData.nom_event_date}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Event Time"
          required
          name="nom_event_time"
          value={formData.nom_event_time}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Event Venue"
          required
          name="nom_event_venue"
          value={formData.nom_event_venue}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Corporate Secretary Name"
          required
          name="nom_corpsec_name"
          value={formData.nom_corpsec_name}
          onChange={handleOnChange}
        />

        <ListComponent data={formData.stockholders} title={"Stockholders/Directors Information"} />

        {radioChange === "with_proxy" && (
          <>
            <Typography variant="small" className="mt-5 font-medium">
              Investor Information
            </Typography>

            <InputComponent
              label="Investor Name"
              required
              name="nom_investor"
              value={formData.nom_investor}
              onChange={handleOnChange}
            />

            <InputComponent
              label="Date Signed"
              required
              name="nom_investor_date_signed"
              type="date"
              value={formData.nom_investor_date_signed}
              onChange={handleOnChange}
            />
          </>
        )}
      </div>
    </>
  );
};
