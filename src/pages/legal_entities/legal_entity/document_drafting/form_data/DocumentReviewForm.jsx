import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReviewComponent from "../../../../../components/ReviewComponent";
import GISTableComponent from "../../../../../components/GISTableComponent";
import {
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
} from "../../../../../utils/global";
import moment from "moment";
import TableComponent from "../../../../../components/TableComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import { use } from "react";

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

  const CoverSheetforAFSComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "SEC Registration Number",
              value: formData.sec_registration_number,
            },
            {
              name: "Company Name",
              value: formData.corporate_name,
            },
            {
              name: "Principal Office",
              value: formData.office_address,
            },
            {
              name: "Form Type",
              value: formData.form_type,
            },
            {
              name: "Department Requiring the Report",
              value: formData.department,
            },
            {
              name: "Secondary License",
              value: formData.secondary_license,
            },
          ]}
        />

        <ReviewComponent
          title="Company Information"
          data={[
            {
              name: "Email Address",
              value: formData.official_email_address,
            },
            {
              name: "Telephone Number",
              value: formData.telephone_number,
            },
            {
              name: "Mobile Number",
              value: formData.official_mobile_number,
            },
            {
              name: "Number of Shareholders",
              value: formData.number_of_shareholders,
            },
            {
              name: "Date of Annual Meeting",
              value: formData.date_of_annual_meeting,
            },
            {
              name: "Fiscal Year End",
              value: formData.fiscal_year_end,
            },
          ]}
        />

        <ReviewComponent
          title="Contact Person"
          data={[
            {
              name: "Name",
              value: formData.contact_person_name,
            },
            {
              name: "Email Address",
              value: formData.contact_person_email,
            },
            {
              name: "Telephone Number",
              value: formData.contact_person_telephone_number,
            },
            {
              name: "Mobile Number",
              value: formData.contact_person_mobile_number,
            },
            {
              name: "Address",
              value: formData.contact_person_address,
            },
          ]}
        />
      </>
    );
  };

  const SMRComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "Company Name",
              value: formData.corporate_name,
            },
            {
              name: "Audited Years in Question",
              value: formData.audited_years_in_question,
            },
            {
              name: "President Name",
              value: formData.president_name,
            },
            {
              name: "Treasurer's Name",
              value: formData.treasurer_name,
            },
            {
              name: "RDO Number",
              value: formData.rdo_number,
            },
            {
              name: "RDO Address",
              value: formData.rdo_address,
            },
            {
              name: "RDO City",
              value: formData.rdo_city,
            },
          ]}
        />
      </>
    );
  };

  const WaiverOfNoticeComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "Company Name",
              value: formData.corporate_name,
            },
            {
              name: "Scheduled Date of Meeting",
              value: moment(formData.scheduled_date).format("MMMM DD, YYYY"),
            },
            {
              name: "Scheduled Time of Meeting",
              value: formData.scheduled_time,
            },
            {
              name: "Venue",
              value: formData.venue,
            },
          ]}
        />
        <ReviewComponent
          title="Stockholders"
          data={formData.stockholders.map((stockholder, index) => ({
            name: `Stockholder ${index + 1}`,
            value: stockholder.name,
          }))}
        />
      </>
    );
  };

  // useEffect(() => {
  //   console.log("Anthony Review Data: ", formData);
  // }, [formData]);

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
        {formData.type === "Cover Sheet for Audited Financial Statements" && (
          <CoverSheetforAFSComponent />
        )}
        {formData.type ===
          "SMR - Statement of Management's Responsibility for Financial Statements" && (
          <SMRComponent />
        )}
        {formData.type === "Waiver of Notice" && <WaiverOfNoticeComponent />}
      </div>
    </>
  );
};
