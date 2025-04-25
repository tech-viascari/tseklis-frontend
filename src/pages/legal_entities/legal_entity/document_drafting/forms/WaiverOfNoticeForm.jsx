import React, { useEffect } from "react";
import InputComponent from "../../../../../components/InputComponent";
import { Typography } from "@material-tailwind/react";
import { ListComponent } from "../../../../../components/ListComponent";

export const WaiverOfNoticeForm = ({ formData, handleOnChange, setFormData }) => {

  return (
    <>
      <div className="flex flex-col gap-3">
        <InputComponent
          label="Company Name"
          required
          name="corporate_name"
          value={formData.corporate_name}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Scheduled Date of Meeting"
          type="date"
          required
          name="scheduled_date"
          value={formData.scheduled_date}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Scheduled Time of Meeting"
          required
          name="scheduled_time"
          value={formData.scheduled_time}
          onChange={handleOnChange}
        />

        <InputComponent
          label="Venue"
          required
          name="venue"
          value={formData.venue}
          onChange={handleOnChange}
        />

        <ListComponent formData={formData} data={formData.stockholders} title={"Stockholders/Directors"} setData={handleOnChange} setFormData={setFormData} targetKey={"stockholders"} />
      </div>
    </>
  );
};
