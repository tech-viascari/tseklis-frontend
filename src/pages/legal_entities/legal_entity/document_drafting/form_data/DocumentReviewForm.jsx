import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import ReviewComponent from "../../../../../components/ReviewComponent";
import GISTableComponent from "../../../../../components/GISTableComponent";
import {
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
} from "../../../../../utils/global";
import moment from "moment";
import TableComponent from "../../../../../components/TableComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";

export const DocumentReviewForm = ({
  formData,
  setFormData,
  errors,
  onChange,
  isPreview = false,
}) => {
  const CGRComponent = () => {
    return (
      <>
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
      </>
    );
  };

  const AffidavitOfNonOperationComponent = () => {
    const columns = [
      {
        name: "Name",
        selector: (row) => row.name,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography variant="small" className="font-normal">
                {row.name}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "ID Number",
        selector: (row) => row.id_no,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography variant="small" className="font-normal">
                {row.id_no}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Date and Place Issued",
        selector: (row) => row.date_place_issued,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography variant="small" className="font-normal">
                {row.date_place_issued}
              </Typography>
            </div>
          );
        },
      },
    ];
    return (
      <>
        <ReviewComponent title="Appointees" data={[]} />
        <div>
          <TableComponent columns={columns} data={formData.appointees} />
        </div>
        <ReviewComponent
          title="Corporate Secretary"
          data={[
            {
              name: "Name",
              value: formData.corp_sec,
            },
            {
              name: "Address",
              value: formData.corp_sec_address,
            },
          ]}
        />
      </>
    );
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
        {formData.type === "Certificate of Gross Sales/Receipts" && (
          <CGRComponent />
        )}
        {formData.type === "Affidavit of Non-Operation" && (
          <AffidavitOfNonOperationComponent />
        )}
      </div>
    </>
  );
};
