import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import ReviewComponent from "../../../../../components/ReviewComponent";
import GISTableComponent from "../../../../../components/GISTableComponent";
import {
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
} from "../../../../../utils/global";

export const ReviewForm = ({
  formData,
  setFormData,
  errors,
  onChange,
  isPreview = false,
}) => {
  const companyDetails = () => {
    let list = [
      {
        name: "SEC Registration Number",
        value: formData.sec_registration_number,
      },
      {
        name: "Corporate Tax Identification Number (TIN)",
        value: formData.corporate_tin,
      },
      {
        name: "Year",
        value: formData.year,
      },
      {
        name: "Date Registered",
        value: formData.date_registered,
      },
      {
        name: "Corporate Name",
        value: formData.corporate_name,
      },
      {
        name: "Fiscal Year End",
        value: formData.fiscal_year_end,
      },
      {
        name: "Business/Trade Name",
        value: formData.business_or_trade_name,
      },
      {
        name: "Official Email Address",
        value: formData.official_email_address,
      },
      {
        name: "Alternate Email Address",
        value: formData.alternate_email_address,
      },
      {
        name: "Complete Principal Office Address",
        value: formData.complete_principal_office_address,
      },
      {
        name: "Official Mobile Number",
        value: formData.official_mobile_number,
      },
      {
        name: "Alternate Phone Number",
        value: formData.alternate_phone_number,
      },
      {
        name: "Date of Annual Meeting Per By-Laws",
        value: formData.date_of_annual_meeting,
      },
      {
        name: "Actual Date of Special Meeting",
        value: formData.actual_date_of_annual_meeting,
      },
      {
        name: "Telephone Number",
        value: formData.telephone_number,
      },
      {
        name: "Name of External Auditor & Signing Partner",
        value: formData.name_of_external_auditor,
      },
      {
        name: "Industry Classification",
        value: formData.industry_classification,
      },
      {
        name: "Fax Number",
        value: formData.fax_number,
      },
      {
        name: "SEC Accreditation Number (if applicable)",
        value: formData.sec_accreditation_number,
      },
      {
        name: "Website URL Address",
        value: formData.website_url_address,
      },
      {
        name: "Geographical Code",
        value: formData.geographical_code,
      },
      {
        name: "Primary Purpose/Activity/Industry Presently Engaged In",
        value: formData.primary_purpose,
      },
    ];

    return list;
  };

  const affiliations = () => {
    let list = [
      {
        name: "Parent Company",
        value: formData.affiliations.parent.name,
      },
      {
        name: "SEC Registration No.",
        value: formData.affiliations.parent.sec_no,
      },
      {
        name: "Address",
        value: formData.affiliations.parent.address,
      },
    ];

    formData.affiliations.subsidiary_affiliate.forEach((affiliate) => {
      list = list.concat([
        {
          name: "Subsidiary/Affiliate",
          value: affiliate.name,
        },
        {
          name: "SEC Registration No.",
          value: affiliate.sec_no,
        },
        {
          name: "Address",
          value: affiliate.address,
        },
      ]);
    });

    return list;
  };

  const describeNature = () => {
    let list = [
      {
        name: "Describe nature of business",
        value: formData.nature_of_business,
      },
      {
        name: "Is the Corporation a covered person under the Anti Money Laundering Act (AMLA), as amended? (Rep. Acts. 9160/9164/10167/10365)",
        value: formData.is_under_AMLA ? "Yes" : "No",
      },
      {
        name: "Has the Corporation complied with the requirements on Customer Due Diligence (CDD) or Know Your Customer (KYC), record-keeping, and submission of reports under the AMLA, as amended, since the last filing of its GIS?",
        value: formData.has_complied_with_the_requirements ? "Yes" : "No",
      },
    ];

    return list;
  };

  const Capital = (formData, capital, capitalName) => {
    const filipinoColumn = [
      {
        name: "Filipino",
        selector: (row) => null,
      },
      {
        name: "Number of Stockholders",
        selector: (row) => row.number_of_stock_holders,
      },
      {
        name: "Type of Shares",

        selector: (row) => {
          if (row.types_of_shares == "TOTAL") {
            return (
              <Typography className="font-semibold text-sm">TOTAL</Typography>
            );
          }
          return row.types_of_shares;
        },
      },
      {
        name: "Number of Shares",
        selector: (row) => formatNumberWithCommaOnly(row.number_of_shares),
      },
      {
        name: "Par/Stated Value",
        selector: (row) => {
          if (row.par_or_stated_value == "TOTAL") {
            return (
              <Typography className="font-semibold text-sm">TOTAL P</Typography>
            );
          }
          return formatNumberWithCommaAndDecimal(row.par_or_stated_value);
        },
      },
      {
        name: "Amount",
        selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
      },
      {
        name: "% of Ownership",
        selector: (row) =>
          formatNumberWithCommaAndDecimal(row.percent_of_ownership),
      },
    ];

    const foreignColumn = [
      {
        name: "Foreign",
        selector: (row) => row.nationality,
      },
      {
        name: "Number of Stockholders",
        selector: (row) => row.number_of_stock_holders,
      },
      {
        name: "Type of Shares",

        selector: (row) => {
          if (row.types_of_shares == "TOTAL") {
            return (
              <Typography className="font-semibold text-sm">TOTAL</Typography>
            );
          }
          return row.types_of_shares;
        },
      },
      {
        name: "Number of Shares",
        selector: (row) => formatNumberWithCommaOnly(row.number_of_shares),
      },
      {
        name: "Par/Stated Value",
        selector: (row) => {
          if (row.par_or_stated_value == "TOTAL") {
            return (
              <Typography className="font-semibold text-sm">TOTAL P</Typography>
            );
          }
          return formatNumberWithCommaAndDecimal(row.par_or_stated_value);
        },
      },
      {
        name: "Amount",
        selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
      },
      {
        name: "% of Ownership",
        selector: (row) =>
          formatNumberWithCommaAndDecimal(row.percent_of_ownership),
      },
    ];

    const filipinoData = [...capital.filipino];

    const foreignData = [...capital.foreign];

    return (
      <div>
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            {capitalName}
          </Typography>
        </div>
        <div className="pt-3 flex flex-col gap-3">
          <div className="py-2 border border-light-gray rounded-2xl w-full  overflow-x-auto">
            <table className="w-full overflow-x-auto">
              <thead></thead>
              <tbody>
                <tr className="pb-5 border border-x-transparent border-t-transparent border-b-light-gray text-center">
                  {filipinoColumn.map((column) => {
                    return (
                      <td
                        className="border-b-light-gray"
                        key={`col-${column.name}`}
                      >
                        <Typography className="font-normal text-sm w-40">
                          {column.name}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>

                {filipinoData.length == 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-3">
                      <Typography className="font-normal text-sm">
                        There are no records to display
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  filipinoData.map((data, index) => {
                    return (
                      <tr
                        className="text-center hover:bg-light-gray"
                        key={`row-${index}`}
                      >
                        <td className="py-5"></td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {data.number_of_stock_holders}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {data.types_of_shares}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaOnly(data.number_of_shares)}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaAndDecimal(
                              data.par_or_stated_value
                            )}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaAndDecimal(data.amount)}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaAndDecimal(
                              data.percent_of_ownership
                            ) + "%"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                )}

                <tr className="border border-x-transparent border-b-transparent border-t-light-gray">
                  <td colSpan={3} className="text-end  py-3">
                    <Typography className="font-semibold text-sm">
                      TOTAL
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaOnly(
                        capital.sub_total_number_of_shares_filipino
                      )}
                    </Typography>
                  </td>
                  <td className="text-end">
                    <Typography className="font-semibold text-sm">
                      TOTAL P
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(
                        capital.sub_total_amount_filipino
                      )}
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(
                        capital.sub_total_ownership_filipino
                      ) + "%"}
                    </Typography>
                  </td>
                </tr>

                <tr className="pb-5 border border-x-transparent border-t-transparent border-b-light-gray text-center">
                  {foreignColumn.map((column) => {
                    return (
                      <td
                        className="border-b-light-gray"
                        key={`col-${column.name}`}
                      >
                        <Typography className="font-normal text-sm w-40">
                          {column.name}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>

                {foreignData.length == 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-3">
                      <Typography className="font-normal text-sm">
                        There are no records to display
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  foreignData.map((data, index) => {
                    return (
                      <tr
                        className="text-center hover:bg-light-gray"
                        key={`row-${index}`}
                      >
                        <td className="py-5">
                          <Typography className="font-normal text-sm w-40">
                            {data.nationality}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {data.number_of_stock_holders}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {data.types_of_shares}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaOnly(data.number_of_shares)}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaAndDecimal(
                              data.par_or_stated_value
                            )}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaAndDecimal(data.amount)}
                          </Typography>
                        </td>
                        <td>
                          <Typography className="font-normal text-sm w-40">
                            {formatNumberWithCommaAndDecimal(
                              data.percent_of_ownership
                            ) + "%"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                )}

                <tr className="border border-x-transparent border-b-transparent border-t-light-gray">
                  <td colSpan={3} className="text-end  py-3">
                    <Typography className="font-semibold text-sm">
                      TOTAL
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaOnly(
                        capital.sub_total_number_of_shares_foreign
                      )}
                    </Typography>
                  </td>
                  <td className="text-end">
                    <Typography className="font-semibold text-sm">
                      TOTAL P
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(
                        capital.sub_total_amount_foreign
                      )}
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(
                        capital.sub_total_ownership_foreign
                      ) + "%"}
                    </Typography>
                  </td>
                </tr>

                <tr>
                  <td colSpan={5} className="text-end">
                    <Typography className="font-semibold text-sm">
                      TOTAL{" "}
                      {capitalName == "Paid Up Capital"
                        ? "PAID-UP"
                        : "SUBSCRIBED"}{" "}
                      P
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(capital.total_amount)}
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(
                        capital.total_percent_of_ownership
                      ) + "%"}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isPreview && (
        <>
          <Typography variant="small" className="font-normal text-sm">
            STEP FOUR
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
        <ReviewComponent title="Company Details" data={companyDetails()} />
        <ReviewComponent
          title="Intercompany Affiliations"
          data={affiliations()}
        />
        <ReviewComponent title="" data={describeNature()} />
        <div>
          <ReviewComponent title="Directors/Officers" data={[]} />
          <GISTableComponent
            data={formData.directors_or_officers}
            columns={[
              {
                name: "Name",
                selector: (row) => row.name,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.name}
                    </Typography>
                  );
                },
              },
              {
                name: "Current Residential Address",
                selector: (row) => row.current_residential_address,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.current_residential_address}
                    </Typography>
                  );
                },
              },
              {
                name: "Nationality",
                selector: (row) => row.nationality,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.nationality}
                    </Typography>
                  );
                },
              },
              {
                name: "Incorporator",
                selector: (row) => row.incorporator,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.incorporator}
                    </Typography>
                  );
                },
              },
              {
                name: "Board",
                selector: (row) => row.board,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.board}
                    </Typography>
                  );
                },
              },
              {
                name: "Gender",
                selector: (row) => row.gender,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.gender}
                    </Typography>
                  );
                },
              },
              {
                name: "Stockholder",
                selector: (row) => row.stock_holder,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.stock_holder}
                    </Typography>
                  );
                },
              },
              {
                name: "Officer",
                selector: (row) => row.officer,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.officer}
                    </Typography>
                  );
                },
              },
              {
                name: "Executive Committee",
                selector: (row) => row.executive_committee,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.executive_committee}
                    </Typography>
                  );
                },
              },
              {
                name: "Tax Identification",
                selector: (row) => row.tax_id_number,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.tax_id_number}
                    </Typography>
                  );
                },
              },
            ]}
          />
        </div>

        <div>
          <ReviewComponent title="Authorized Capital Stock" data={[]} />
          <GISTableComponent
            data={formData.auth_capital_stock.capital_stocks}
            columns={[
              {
                name: "Type of Shares",
                selector: (row) => row.type_of_shares,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.type_of_shares}
                    </Typography>
                  );
                },
              },
              {
                name: "Number of Shares",
                selector: (row) =>
                  formatNumberWithCommaOnly(row.number_of_shares),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaOnly(row.number_of_shares)}
                    </Typography>
                  );
                },
              },
              {
                name: "Par or Stated Value",
                selector: (row) =>
                  formatNumberWithCommaAndDecimal(row.par_or_stated_value),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(row.par_or_stated_value)}
                    </Typography>
                  );
                },
              },
              {
                name: "Amount",
                selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(row.amount)}
                    </Typography>
                  );
                },
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="Stockholders Information"
            data={[
              {
                name: "Total Assets Based on Latest Audited Financial Statements",
                value: formData.total_assets_based_on_latest_audited,
              },
            ]}
          />
          <GISTableComponent
            data={formData.stock_holders_information.information}
            columns={[
              {
                name: "Name",
                selector: (row) => row.name,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.name}
                    </Typography>
                  );
                },
              },
              {
                name: "Nationality",
                selector: (row) => row.nationality,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.nationality}
                    </Typography>
                  );
                },
              },
              {
                name: "Current Residential Address",
                selector: (row) => row.current_residential_address,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.current_residential_address}
                    </Typography>
                  );
                },
              },
              {
                name: "Type",
                selector: (row) => row.type,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.type}
                    </Typography>
                  );
                },
              },
              {
                name: "Number",
                selector: (row) => formatNumberWithCommaOnly(row.number),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaOnly(row.number)}
                    </Typography>
                  );
                },
              },
              {
                name: "Amount",
                selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(row.amount)}
                    </Typography>
                  );
                },
              },
              {
                name: "% of Ownership",
                selector: (row) =>
                  formatNumberWithCommaAndDecimal(row.percent_of_ownership),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(
                        row.percent_of_ownership
                      )}
                    </Typography>
                  );
                },
              },
              {
                name: "Amount Paid in PHP",
                selector: (row) =>
                  formatNumberWithCommaAndDecimal(row.amount_paid),
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {formatNumberWithCommaAndDecimal(row.amount_paid)}
                    </Typography>
                  );
                },
              },
              {
                name: "Tax Identification Number",
                selector: (row) => row.tax_id_number,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.tax_id_number}
                    </Typography>
                  );
                },
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          {Capital(formData, formData.subscribe_capital, "Subscribed Capital")}
          {Capital(formData, formData.paid_up_capital, "Paid Up Capital")}
        </div>

        <div className="flex flex-col gap-3">
          <ReviewComponent
            title="Beneficial Ownership Declaration"
            data={[
              {
                name: "Corporate Secretary",
                value: formData.corporate_secretary,
              },
            ]}
          />
          <GISTableComponent
            data={formData.beneficial_ownership_declaration}
            columns={[
              {
                name: "Complete Name (Surname, Given Name, Middle Name, Name Extension(i.e. Jr., Sr., III))",
                selector: (row) => row.complete_name,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.complete_name}
                    </Typography>
                  );
                },
              },
              {
                name: "Specific Residential Address",
                selector: (row) => row.specific_residential_address,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.specific_residential_address}
                    </Typography>
                  );
                },
              },
              {
                name: "Nationality",
                selector: (row) => row.nationality,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.nationality}
                    </Typography>
                  );
                },
              },
              {
                name: "Date of Birth",
                selector: (row) => row.date_of_birth,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.date_of_birth}
                    </Typography>
                  );
                },
              },
              {
                name: "Tax Identification Number",
                selector: (row) => row.tax_id_number,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.tax_id_number}
                    </Typography>
                  );
                },
              },
              {
                name: "% of Ownership / % of Voting Rights",
                selector: (row) => row.percent_of_ownership,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.percent_of_ownership}
                    </Typography>
                  );
                },
              },
              {
                name: "Type of Beneficial Owner [Direct (D) or Indirect (I)]",
                selector: (row) => row.type_of_beneficial_owner,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.type_of_beneficial_owner}
                    </Typography>
                  );
                },
              },
              {
                name: "Category of Beneficial Ownership",
                selector: (row) => row.category_of_beneficial_ownership,
                cell: (row) => {
                  return (
                    <Typography className="font-normal text-sm">
                      {row.category_of_beneficial_ownership}
                    </Typography>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
