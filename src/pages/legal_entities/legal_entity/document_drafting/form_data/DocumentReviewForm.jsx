import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import ReviewComponent from "../../../../../components/ReviewComponent";
import GISTableComponent from "../../../../../components/GISTableComponent";
import {
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
} from "../../../../../utils/global";
import moment from "moment";

export const DocumentReviewForm = ({
  formData,
  setFormData,
  errors,
  onChange,
  isPreview = false,
}) => {
  const ReviewForm = () => {
    return <></>;
  };
  return (
    <>
      {!isPreview && (
        <>
          <Typography variant="small" className="font-normal text-sm">
            STEP THREE
          </Typography>
          <Typography variant="small" className="font-bold text-md">
            Review Information
          </Typography>
          <Typography variant="small" className="font-normal text-sm">
            Kindly verify the details before submitting the record.
          </Typography>
        </>
      )}

      <div className={`flex flex-col gap-5 ${!isPreview && "py-10"}`}>
        <ReviewComponent
          title=""
          data={[
            {
              name: "Document Type",
              value: formData.type,
            },
          ]}
        />
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "Year",
              value: formData.year,
            },
            {
              name: "Date From",
              value: moment(formData.date_from).format("MMMM DD, YYYY"),
            },
            {
              name: "Date To",
              value: moment(formData.date_to).format("MMMM DD, YYYY"),
            },
            {
              name: "Office Address",
              value: formData.type,
            },
            {
              name: `Q1 ${formData.year}`,
              value: `PHP ${formatNumberWithCommaAndDecimal(
                formData.revenue_q1
              )}`,
            },
            {
              name: `Q2 ${formData.year}`,
              value: `PHP ${formatNumberWithCommaAndDecimal(
                formData.revenue_q2
              )}`,
            },
            {
              name: `Q3 ${formData.year}`,
              value: `PHP ${formatNumberWithCommaAndDecimal(
                formData.revenue_q3
              )}`,
            },
            {
              name: `Q4 ${formData.year}`,
              value: `PHP ${formatNumberWithCommaAndDecimal(
                formData.revenue_q4
              )}`,
            },
            {
              name: "Total Revenue",
              value: `PHP ${formatNumberWithCommaAndDecimal(
                formData.total_revenue
              )}`,
            },
          ]}
        />
        <ReviewComponent
          title="Signatory"
          data={[
            {
              name: "Officer Name",
              value: formData.officer_name,
            },
            {
              name: "Officer Position",
              value: formData.officer_position,
            },
          ]}
        />
      </div>
    </>
  );
};
