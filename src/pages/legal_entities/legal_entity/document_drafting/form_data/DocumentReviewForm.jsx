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
              value:
                formData.sec_registration_number ||
                "No SEC Registration Number Provided",
            },
            {
              name: "Company Name",
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "Principal Office",
              value: formData.office_address || "No Principal Office Provided",
            },
            {
              name: "Form Type",
              value: formData.form_type || "No Form Type Provided",
            },
            {
              name: "Department Requiring the Report",
              value: formData.department || "No Department Provided",
            },
            {
              name: "Secondary License",
              value:
                formData.secondary_license || "No Secondary License Provided",
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
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "Current Year Audited",
              value: formData.audited_years_in_question || "No Year Provided",
            },
            {
              name: "President Name",
              value: formData.president_name || "No President Name Provided",
            },
            {
              name: "Treasurer's Name",
              value: formData.treasurer_name || "No Treasurer Name Provided",
            },
            {
              name: "RDO Number",
              value: formData.rdo_number || "No RDO Number Provided",
            },
            {
              name: "RDO Address",
              value: formData.rdo_address || "No RDO Address Provided",
            },
            {
              name: "RDO City",
              value: formData.rdo_city || "No RDO City Provided",
            },
          ]}
        />
      </>
    );
  };

  const SMRBIRComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "Company Name",
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "Current Year Audited",
              value: formData.smr_bir_year_audited || "No Year Provided",
            },
            {
              name: "President Name",
              value: formData.president_name || "No President Name Provided",
            },
            {
              name: "Treasurer's Name",
              value: formData.treasurer_name || "No Treasurer Name Provided",
            },
            {
              name: "RDO Number",
              value: formData.smr_bir_rdo_number || "No RDO Number Provided",
            },
            {
              name: "RDO Address",
              value: formData.smr_bir_rdo_address || "No RDO Address Provided",
            },
            {
              name: "RDO City",
              value: formData.smr_bir_rdo_city || "No RDO City Provided",
            },
          ]}
        />
      </>
    );
  };

  const SMRSECComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "Company Name",
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "Current Year Audited",
              value: formData.smr_bir_year_audited || "No Year Provided",
            },
            {
              name: "President Name",
              value: formData.president_name || "No President Name Provided",
            },
            {
              name: "Treasurer's Name",
              value: formData.treasurer_name || "No Treasurer Name Provided",
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
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "Scheduled Date of Meeting",
              value:
                moment(formData.scheduled_date).format("MMMM DD, YYYY") ||
                "No Date Provided",
            },
            {
              name: "Scheduled Time of Meeting",
              value: formData.scheduled_time || "No Time Provided",
            },
            {
              name: "Venue",
              value: formData.venue || "No Venue Provided",
            },
          ]}
        />

        {formData.stockholders.length > 0 ? (
          <ReviewComponent
            title="Stockholders"
            data={formData.stockholders.map((stockholder, index) => ({
              name: `Stockholder ${index + 1}`,
              value: stockholder.name,
            }))}
          />
        ) : (
          <ReviewComponent
            title="Stockholders"
            data={[
              {
                name: "Stockholders",
                value: "No Stockholder. Please add one.",
              },
            ]}
          />
        )}
      </>
    );
  };

  const NoticeOfMeetingComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "With Proxy",
              value: formData.with_proxy ? "Yes" : "No",
            },
            {
              name: "Company Name",
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "Event Name",
              value: formData.nom_event_name || "No Event Name Provided",
            },
            {
              name: "Event Date",
              value:
                moment(formData.nom_event_date).format("MMMM DD, YYYY") ||
                "No Event Date Provided",
            },
            {
              name: "Event Time",
              value: formData.nom_event_time || "No Event Time Provided",
            },
            {
              name: "Event Venue",
              value: formData.nom_event_venue || "No Event Venue Provided",
            },
            {
              name: "Corporate Secretary Name",
              value:
                formData.nom_corpsec_name ||
                "No Corporate Secretary Name Provided",
            },
          ]}
        />

        {formData.stockholders.length > 0 ? (
          <ReviewComponent
            title="Stockholders"
            data={formData.stockholders.map((stockholder, index) => ({
              name: `Stockholder ${index + 1}`,
              value: stockholder.name,
            }))}
          />
        ) : (
          <ReviewComponent
            title="Stockholders"
            data={[
              {
                name: "Stockholders",
                value: "No Stockholder. Please add one.",
              },
            ]}
          />
        )}

        {formData.nom_event_agendas.length > 0 ? (
          <ReviewComponent
            title="Event Agendas"
            data={formData.nom_event_agendas.map((agenda, index) => ({
              name: `Event Agenda ${index + 1}`,
              value: agenda.name,
            }))}
          />
        ) : (
          <ReviewComponent
            title="Event Agendas"
            data={[
              {
                name: "Event Agendas",
                value: "No Event Agenda. Please add one.",
              },
            ]}
          />
        )}

        {formData.with_proxy === "with_proxy" && (
          <ReviewComponent
            title="Investor"
            data={[
              {
                name: "Investor Name",
                value: formData.nom_investor || "No Investor Name Provided",
              },
              {
                name: "Date Signed",
                value:
                  moment(formData.nom_investor_date_signed).format(
                    "MMMM DD, YYYY"
                  ) || "No Date Signed Provided",
              },
            ]}
          />
        )}
      </>
    );
  };

  const RNHASComponent = () => {
    return (
      <>
        <ReviewComponent
          title="Document Details"
          data={[
            {
              name: "Company Name",
              value: formData.corporate_name || "No Company Name Provided",
            },
            {
              name: "SEC Registration Number",
              value:
                formData.sec_registration_number ||
                "No SEC Registration Number Provided",
            },
            {
              name: "Date of Annual Meeting",
              value:
                moment(formData.date_of_annual_meeting).format(
                  "MMMM DD, YYYY"
                ) || "No Date Provided",
            },
            {
              name: "Reason for Non-Holding of Annual Meeting",
              value:
                formData.rnhasm_reason ||
                "No Reason for Non-Holding of Annual Meeting Provided",
            },
          ]}
        />

        <ReviewComponent
          title="Corporate Secretary / Authorized Representative Information"
          data={[
            {
              name: "Corporate Secretary Name",
              value:
                formData.corp_sec || "No Corporate Secretary Name Provided",
            },
            {
              name: "Official Contact Email",
              value:
                formData.official_email_address || "No Official Contact Email Provided",
            },
            {
              name: "Official Contact Mobile Number",
              value:
                formData.official_mobile_number ||
                "No Official Contact Number Provided",
            },
          ]}
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
        {formData.type === "SMR for BIR and SEC" && <SMRComponent />}
        {formData.type === "SMR for BIR" && <SMRBIRComponent />}
        {formData.type === "SMR for SEC" && <SMRSECComponent />}
        {formData.type === "Waiver of Notice" && <WaiverOfNoticeComponent />}
        {formData.type === "Notice of Meeting" && <NoticeOfMeetingComponent />}
        {formData.type ===
          "Report on Non-holding of Annual Stockholders' Meeting" && (
          <RNHASComponent />
        )}
      </div>
    </>
  );
};
