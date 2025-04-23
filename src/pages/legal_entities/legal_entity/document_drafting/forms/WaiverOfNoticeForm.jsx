import React from "react";
import InputComponent from "../../../../../components/InputComponent";
import { Typography } from "@material-tailwind/react";
import { ListComponent } from "../../../../../components/ListComponent";

export const WaiverOfNoticeForm = ({ formData, handleOnChange }) => {
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

        <ListComponent data={formData.stockholders} title={"Stockholders/Directors Information"} />

        {/* {formData.stockholders.length > 0 && (
          <Typography variant="small" className="mt-5 font-medium">
            Stockholders/Directors Information
          </Typography>
        )}

        {formData.stockholders.map((stockholder, index) => (
          <InputComponent
            key={index}
            label={`Stockholder ${index + 1}`}
            required
            name={`stockholder_${index}`}
            value={stockholder.name}
            onChange={handleOnChange}
            // value={stockholder}
            // onChange={(e) => {
            //   const updatedStockholders = [...formData.stockholders];
            //   updatedStockholders[index] = e.target.value;
            //   handleOnChange({
            //     target: { name: "stockholders", value: updatedStockholders },
            //   });
            // }}
          />
        ))} */}
      </div>
    </>
  );
};
