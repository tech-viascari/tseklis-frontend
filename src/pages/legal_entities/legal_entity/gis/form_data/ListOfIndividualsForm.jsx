import { Checkbox, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import useGISDocumentStore from "../../../../../store/useGISDocumentStore";
import GISTableComponent from "../../../../../components/GISTableComponent";
import moment from "moment";
import { HiMinusCircle } from "react-icons/hi2";
import {
  formatFullName,
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
  formattedDate,
  formatTIN,
} from "../../../../../utils/global";
import SelectComponent from "../../../../../components/SelectComponent";
import { toast } from "sonner";

export const ListOfIndividualsForm = ({
  formData,
  setFormData,
  errors,
  onChange,
  WarningMessage = () => <></>,
}) => {
  const [updateData, setUpdateData] = useState(formData);

  const { document_state } = useGISDocumentStore();

  const [selectedIndividualIndex, setSelectedIndividualIndex] = useState(-1);

  const [selectedIndividual, setSelectedIndividual] = useState({
    ...document_state.individualState,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const [individualDialog, setIndividualDialog] = useState(false);
  const handleIndividualDialog = () => {
    setIndividualDialog(!individualDialog);
  };

  const [addIndividualDialog, setAddIndividualDialog] = useState(false);
  const handleAddIndividualDialog = (row, rowIndex = -1) => {
    if (row != undefined) {
      setSelectedIndividual(row);
      setSelectedIndividualIndex(rowIndex);
    }
    handleIndividualDialog();
    setAddIndividualDialog(!addIndividualDialog);
  };

  const capitaStructureComponent = (capital, capitalName) => {
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

  const directorsComponent = () => {
    const directorsColumn = [
      {
        name: "Name",
        selector: (row) => row.name,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.name}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Current Residential Address",
        selector: (row) => row.current_residential_address,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.current_residential_address}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Nationality",
        selector: (row) => row.nationality,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.nationality}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Incorporator",
        selector: (row) => row.incorporator,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.incorporator}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Board",
        selector: (row) => row.board,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.board}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Gender",
        selector: (row) => row.gender,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.gender}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Stockholder",
        selector: (row) => row.stock_holder,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.stock_holder}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Officer",
        selector: (row) => row.officer,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.officer}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Executive Committee",
        selector: (row) => row.executive_committee,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.executive_committee}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Tax Identification Number",
        selector: (row) => row.tax_id_number,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.tax_id_number}
              </Typography>
            </div>
          );
        },
      },
    ];

    return (
      <div className="pb-10">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Directors/Officers
          </Typography>
        </div>
        <div className="w-full overflow-x-auto pt-5">
          <GISTableComponent
            customRowStyle
            data={formData.directors_or_officers}
            columns={directorsColumn}
          />
        </div>
      </div>
    );
  };

  const stockholdersInformationComponent = () => {
    const stockholdersInformationColumn = [
      {
        name: "Name",
        selector: (row) => row.name,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.name}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Nationality",
        selector: (row) => row.nationality,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.nationality}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Current Residential Address",
        selector: (row) => row.current_residential_address,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.current_residential_address}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Type",
        selector: (row) => row.type,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.type}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Number",
        selector: (row) => row.number,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaOnly(row.number)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaAndDecimal(row.amount)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "% of Ownership",
        selector: (row) => row.percent_of_ownership,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaAndDecimal(row.percent_of_ownership) +
                  "%"}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Amount Paid in PHP",
        selector: (row) => row.amount_paid,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaAndDecimal(row.amount_paid)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Tax Identification Number",
        selector: (row) => row.tax_id_number,
        cell: (row, rowIndex) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.tax_id_number}
              </Typography>
            </div>
          );
        },
      },
    ];
    return (
      <div className="pb-10">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Stockholder's Information
          </Typography>
        </div>
        <div className="w-full overflow-x-auto pt-5">
          <GISTableComponent
            data={formData.stock_holders_information.information}
            columns={stockholdersInformationColumn}
          />
        </div>
      </div>
    );
  };

  const BODPreviewComponent = () => {
    const BODColumn = [
      {
        name: "Complete Name (Surname, Given Name, Middle Name, Name Extension(i.e. Jr., Sr., III))",
        selector: (row) => row.complete_name,
        cell: (row) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.complete_name}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Specific Residential Address",
        selector: (row) => row.specific_residential_address,
        cell: (row) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.specific_residential_address}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Nationality",
        selector: (row) => row.nationality,
        cell: (row) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.nationality}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Date of Birth",
        selector: (row) => row.date_of_birth,
        cell: (row) => {
          let dateOfBirth = row.date_of_birth;
          if (dateOfBirth == "") return "";
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {moment(dateOfBirth).format("MMMM DD, YYYY")}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Tax Identification Number",
        selector: (row) => row.tax_id_number,
        cell: (row) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.tax_id_number}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "% of Ownership / % of Voting Rights",
        selector: (row) => row.percent_of_ownership,
        cell: (row) => {
          if (
            row.percent_of_ownership == "" ||
            row.percent_of_ownership == null
          )
            return "";
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {`${formatNumberWithCommaAndDecimal(
                  row.percent_of_ownership
                )}%`}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Type of Beneficial Owner [Direct (D) or Indirect (I)]",
        selector: (row) => row.type_of_beneficial_owner,
        cell: (row) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.type_of_beneficial_owner}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Category of Beneficial Ownership",
        selector: (row) => row.category_of_beneficial_ownership,
        cell: (row) => {
          return (
            <div className="w-full">
              <Typography className="font-normal text-sm">
                {row.category_of_beneficial_ownership}
              </Typography>
            </div>
          );
        },
      },
    ];

    return (
      <div className="pb-10">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Beneficial Ownership Declaration
          </Typography>
        </div>
        <div className="w-full overflow-x-auto pt-5">
          <GISTableComponent
            data={formData.beneficial_ownership_declaration}
            columns={BODColumn}
          />
        </div>
      </div>
    );
  };

  const handleOnChangeIndividual = (e) => {
    const { name, value } = e.target;
    setSelectedIndividual({ ...selectedIndividual, [name]: value });
  };

  const updatePercentOfOwnershipAddIndividual = (list_of_individuals) => {
    let total_number_of_shares = 0;

    list_of_individuals.forEach((individual) => {
      if (individual.is_stockholder) {
        total_number_of_shares += parseFloat(individual.number);
      }
    });

    const list_of_individuals_with_percent_of_ownership =
      list_of_individuals.map((individual) => {
        if (
          (individual.is_stockholder ||
            individual.is_beneficial_ownership_declaration) &&
          total_number_of_shares > 0
        ) {
          individual.percent_of_ownership =
            (parseFloat(individual.number) / total_number_of_shares) * 100;
        }
        return individual;
      });

    setUpdateData({
      ...updateData,
      list_of_individuals: list_of_individuals_with_percent_of_ownership,
    });
  };

  const updateStockHoldersData = (stockholders) => {
    let total_amount = 0;
    let total_amount_paid = 0;

    let number_of_stockholders_with_more_shares_each = 0;

    stockholders.forEach((stockholder) => {
      if (Number(stockholder.number) >= 100) {
        number_of_stockholders_with_more_shares_each++;
      }
      total_amount += Number(stockholder.amount);
      total_amount_paid += Number(stockholder.amount_paid);
    });

    const newStockHoldersData = stockholders.map((stockholder) => {
      let percent_of_ownership = stockholder.percent_of_ownership;
      let type = stockholder.type.toUpperCase();

      percent_of_ownership = (
        (stockholder.amount / total_amount) *
        100
      ).toFixed(4);

      return {
        ...stockholder,
        percent_of_ownership: percent_of_ownership,
        type,
      };
    });

    const updatedCapitalStructure = updateCapitalStructure(newStockHoldersData);

    const updated = {
      stock_holders_information: {
        ...updateData.stock_holders_information,
        information: newStockHoldersData,
      },
      subscribe_capital: updatedCapitalStructure.subscribe_capital,
      paid_up_capital: updatedCapitalStructure.paid_up_capital,
      total_number_of_stockholders: stockholders.length,
      number_of_stockholders_with_more_shares_each,
    };

    return updated;
  };

  const updateCapitalStructure = (stockholders) => {
    if (formData.auth_capital_stock.capital_stocks.length != 0) {
      const par_or_stated_value = Number(
        formData.auth_capital_stock.capital_stocks[0].par_or_stated_value
      );

      let subscribedCapital = { ...document_state.subscribeCapital };
      let paidUpCapital = { ...document_state.paidUpCapitalState };

      let subscribedCapitalFilipino = [];
      let subscribedCapitalForeign = [];

      let paidUpCapitalFilipino = [];
      let paidUpCapitalForeign = [];

      stockholders.forEach((stockholder) => {
        let subscribedCapitalFilipinoState = {
          ...document_state.filipinoSubscribeCapital,
        };

        let subscribedCapitalForeignState = {
          ...document_state.foreignSubscribeCapital,
        };

        let paidUpCapitalFilipinoState = {
          ...document_state.filipinoPaidUpCapital,
        };

        let paidUpCapitalForeignState = {
          ...document_state.foreignSubscribeCapital,
        };

        if (stockholder.nationality.toUpperCase() == "FILIPINO") {
          //Filipino

          //Subscribed Capital
          subscribedCapital.sub_total_amount_filipino += Number(
            stockholder.amount
          );
          subscribedCapital.sub_total_number_of_shares_filipino += Number(
            stockholder.number
          );

          subscribedCapitalFilipinoState.number_of_stock_holders++;
          subscribedCapitalFilipinoState.amount = Number(stockholder.amount);
          subscribedCapitalFilipinoState.number_of_shares = Number(
            stockholder.number
          );
          subscribedCapitalFilipinoState.par_or_stated_value =
            par_or_stated_value;

          subscribedCapitalFilipinoState.types_of_shares =
            stockholder.type.toUpperCase();

          let isSameNationality = false;
          subscribedCapitalFilipino.forEach((subscribe) => {
            isSameNationality = true;
            subscribe.number_of_stock_holders++;
            subscribe.amount += Number(stockholder.amount);
            subscribe.number_of_shares += Number(stockholder.number);
            subscribe.types_of_shares = stockholder.type.toUpperCase();
          });

          if (!isSameNationality) {
            subscribedCapitalFilipino.push(subscribedCapitalFilipinoState);
          }

          //Paid Up Capital
          paidUpCapital.sub_total_amount_filipino += Number(
            stockholder.amount_paid
          );
          paidUpCapital.sub_total_number_of_shares_filipino += Number(
            stockholder.number
          );

          paidUpCapitalFilipinoState.number_of_stock_holders++;
          paidUpCapitalFilipinoState.amount = Number(stockholder.amount_paid);
          paidUpCapitalFilipinoState.number_of_shares = Number(
            stockholder.number
          );
          paidUpCapitalFilipinoState.par_or_stated_value = par_or_stated_value;

          paidUpCapitalFilipinoState.types_of_shares =
            stockholder.type.toUpperCase();

          isSameNationality = false;

          paidUpCapitalFilipino.forEach((subscribe) => {
            isSameNationality = true;
            subscribe.number_of_stock_holders++;
            subscribe.amount += Number(stockholder.amount_paid);
            subscribe.number_of_shares += Number(stockholder.number);
            subscribe.types_of_shares = stockholder.type.toUpperCase();
          });

          if (!isSameNationality) {
            paidUpCapitalFilipino.push(paidUpCapitalFilipinoState);
          }
        } else {
          //Foreign

          //Subscribed Capital
          subscribedCapital.sub_total_amount_foreign += Number(
            stockholder.amount
          );
          subscribedCapital.sub_total_number_of_shares_foreign += Number(
            stockholder.number
          );

          subscribedCapitalForeignState.nationality = stockholder.nationality;
          subscribedCapitalForeignState.number_of_stock_holders++;
          subscribedCapitalForeignState.amount = Number(stockholder.amount);
          subscribedCapitalForeignState.number_of_shares = Number(
            stockholder.number
          );
          subscribedCapitalForeignState.par_or_stated_value =
            par_or_stated_value;

          subscribedCapitalForeignState.types_of_shares =
            stockholder.type.toUpperCase();

          let isSameNationality = false;
          subscribedCapitalForeign.forEach((subscribe) => {
            if (
              subscribe.nationality.toUpperCase() ==
              stockholder.nationality.toUpperCase()
            ) {
              isSameNationality = true;
              subscribe.number_of_stock_holders++;
              subscribe.amount += Number(stockholder.amount);
              subscribe.number_of_shares += Number(stockholder.number);
              subscribe.types_of_shares = stockholder.type.toUpperCase();
            }
          });

          if (!isSameNationality) {
            subscribedCapitalForeign.push(subscribedCapitalForeignState);
          }

          //Paid Up Capital
          paidUpCapital.sub_total_amount_foreign += Number(
            stockholder.amount_paid
          );
          paidUpCapital.sub_total_number_of_shares_foreign += Number(
            stockholder.number
          );

          paidUpCapitalForeignState.nationality = stockholder.nationality;
          paidUpCapitalForeignState.number_of_stock_holders++;
          paidUpCapitalForeignState.amount = Number(stockholder.amount_paid);
          paidUpCapitalForeignState.number_of_shares = Number(
            stockholder.number
          );
          paidUpCapitalForeignState.par_or_stated_value = par_or_stated_value;

          paidUpCapitalForeignState.types_of_shares =
            stockholder.type.toUpperCase();

          isSameNationality = false;
          paidUpCapitalForeign.forEach((subscribe) => {
            if (
              subscribe.nationality.toUpperCase() ==
              stockholder.nationality.toUpperCase()
            ) {
              isSameNationality = true;
              subscribe.number_of_stock_holders++;
              subscribe.amount += Number(stockholder.amount_paid);
              subscribe.number_of_shares += Number(stockholder.number);
              subscribe.types_of_shares = stockholder.type.toUpperCase();
            }
          });

          if (!isSameNationality) {
            paidUpCapitalForeign.push(paidUpCapitalForeignState);
          }
        }

        //Subscribed Capital
        subscribedCapital.total_amount += Number(stockholder.amount);
        subscribedCapital.total_number_of_shares += Number(stockholder.number);

        //Paid Up Capital
        paidUpCapital.total_amount += Number(stockholder.amount_paid);
        paidUpCapital.total_number_of_shares += Number(stockholder.number);
      });

      //Computation for Percent of ownership

      let subscribed_sub_total_ownership_filipino = 0;
      let subscribed_sub_total_ownership_foreign = 0;

      subscribedCapitalFilipino = subscribedCapitalFilipino.map((subscribe) => {
        subscribe.percent_of_ownership =
          (subscribe.amount / subscribedCapital.total_amount) * 100;
        subscribed_sub_total_ownership_filipino +=
          subscribe.percent_of_ownership;
        return subscribe;
      });

      subscribedCapitalForeign = subscribedCapitalForeign.map((subscribe) => {
        subscribe.percent_of_ownership =
          (subscribe.amount / subscribedCapital.total_amount) * 100;
        subscribed_sub_total_ownership_foreign +=
          subscribe.percent_of_ownership;
        return subscribe;
      });

      let paid_up_sub_total_ownership_filipino = 0;
      let paid_up_sub_total_ownership_foreign = 0;

      paidUpCapitalFilipino = paidUpCapitalFilipino.map((paid_up) => {
        paid_up.percent_of_ownership =
          (paid_up.amount / subscribedCapital.total_amount) * 100;

        paid_up_sub_total_ownership_filipino += paid_up.percent_of_ownership;

        return paid_up;
      });

      paidUpCapitalForeign = paidUpCapitalForeign.map((paid_up) => {
        paid_up.percent_of_ownership =
          (paid_up.amount / subscribedCapital.total_amount) * 100;

        paid_up_sub_total_ownership_foreign += paid_up.percent_of_ownership;

        return paid_up;
      });

      subscribedCapital.filipino = subscribedCapitalFilipino;
      subscribedCapital.foreign = subscribedCapitalForeign;
      subscribedCapital.sub_total_ownership_filipino =
        subscribed_sub_total_ownership_filipino;
      subscribedCapital.sub_total_ownership_foreign =
        subscribed_sub_total_ownership_foreign;
      subscribedCapital.total_percent_of_ownership =
        subscribedCapital.sub_total_ownership_filipino +
        subscribedCapital.sub_total_ownership_foreign;

      paidUpCapital.filipino = paidUpCapitalFilipino;
      paidUpCapital.foreign = paidUpCapitalForeign;
      paidUpCapital.sub_total_ownership_filipino =
        paid_up_sub_total_ownership_filipino;
      paidUpCapital.sub_total_ownership_foreign =
        paid_up_sub_total_ownership_foreign;
      paidUpCapital.total_percent_of_ownership =
        paidUpCapital.sub_total_ownership_filipino +
        paidUpCapital.sub_total_ownership_foreign;

      return {
        subscribe_capital: subscribedCapital,
        paid_up_capital: paidUpCapital,
      };
    } else {
      console.log("No par stated value");
    }
  };

  const toggleAddIndividual = () => {
    let list_of_individuals = [
      ...updateData.list_of_individuals,
      selectedIndividual,
    ];
    updatePercentOfOwnershipAddIndividual(list_of_individuals);
    handleAddIndividualDialog(document_state.individualState);
  };

  const toggleSaveIndividual = () => {
    const listOfIndividuals = updateData.list_of_individuals;

    // holds the values for the directors
    let directors_or_officers = [];

    // holds the values for the stockholders information
    let stock_holders_information = [];

    // holds the values for the beneficial ownership declaration
    let beneficial_ownership_declaration = [];

    let corporate_secretary = "";

    listOfIndividuals.forEach((individual) => {
      const fullName = formatFullName(
        individual.first_name,
        individual.middle_name,
        individual.last_name
      );

      if (individual.is_officer) {
        const directorsOrOfficers = {
          ...document_state.directorsOrOfficers,
          name: fullName,
          current_residential_address: individual.current_residential_address,
          nationality: individual.nationality,
          incorporator: individual.incorporator,
          board: individual.board,
          gender: individual.gender,
          stock_holder: individual.stock_holder,
          officer: individual.officer,
          executive_committee: individual.executive_committee,
          tax_id_number: individual.tax_id_number,
        };

        if (individual.officer.toLowerCase().includes("corporate secretary")) {
          corporate_secretary = fullName;
        }

        directors_or_officers.push(directorsOrOfficers);
      }

      if (individual.is_stockholder) {
        const stockholdersInformation = {
          ...document_state.stockholdersInformation,
          name: fullName,
          nationality: individual.nationality,
          current_residential_address: individual.current_residential_address,
          type: individual.type,
          number: individual.number,
          amount: individual.amount,
          percent_of_ownership: individual.percent_of_ownership,
          amount_paid: individual.amount_paid,
          tax_id_number: individual.tax_id_number,
        };
        stock_holders_information.push(stockholdersInformation);
      }

      if (individual.is_beneficial_ownership_declaration) {
        const beneficialOwnershipDeclaration = {
          ...document_state.beneficialOwnershipDeclaration,
          complete_name: fullName,
          specific_residential_address: individual.current_residential_address,
          nationality: individual.nationality,
          date_of_birth: individual.date_of_birth,
          tax_id_number: individual.tax_id_number,
          percent_of_ownership: individual.percent_of_ownership,
          type_of_beneficial_owner: individual.type_of_beneficial_owner,
          category_of_beneficial_ownership:
            individual.category_of_beneficial_ownership,
        };
        beneficial_ownership_declaration.push(beneficialOwnershipDeclaration);
      }
    });

    //Sort the stockholders information based from highest amount
    const sorted_stock_holders_information = stock_holders_information.sort(
      (a, b) => {
        // Convert both values to numbers in case they are strings
        let aValue = isNaN(a.amount) ? a.amount : Number(a.amount);
        let bValue = isNaN(b.amount) ? b.amount : Number(b.amount);

        return bValue - aValue;
      }
    );

    //Compute for Subscribed and Paid-Up Capital
    const updatedForm = updateStockHoldersData(
      sorted_stock_holders_information
    );

    setFormData({
      ...formData,
      list_of_individuals: listOfIndividuals,
      number_of_stockholders_with_more_shares_each:
        updatedForm.number_of_stockholders_with_more_shares_each,
      paid_up_capital: updatedForm.paid_up_capital,
      stock_holders_information: updatedForm.stock_holders_information,
      subscribe_capital: updatedForm.subscribe_capital,
      total_number_of_stockholders: updatedForm.total_number_of_stockholders,
      directors_or_officers,
      beneficial_ownership_declaration,
      corporate_secretary,
    });

    handleIndividualDialog();
  };

  const IndividualFormComponent = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const IndividualColumn = [
      {
        name: "Complete Name",
        selector: (row) => row.complete_name,
        cell: (row, rowIndex) => {
          const fullName = formatFullName(
            row.first_name,
            row.middle_name,
            row.last_name
          );
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {fullName}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Nationality",
        selector: (row) => row.nationality,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.nationality.toUpperCase()}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Current Residential Address",
        selector: (row) => row.current_residential_address,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.current_residential_address}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Incorporator",
        selector: (row) => row.incorporator,
        cell: (row, rowIndex) => {
          if (!row.is_officer) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.incorporator}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Board",
        selector: (row) => row.board,
        cell: (row, rowIndex) => {
          if (!row.is_officer) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.board}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Gender",
        selector: (row) => row.gender,
        cell: (row, rowIndex) => {
          if (!row.is_officer) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.gender}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Stockholder",
        selector: (row) => row.stock_holder,
        cell: (row, rowIndex) => {
          if (!row.is_officer) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.stock_holder}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Officer",
        selector: (row) => row.officer,
        cell: (row, rowIndex) => {
          if (!row.is_officer) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.officer}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Executive Committee",
        selector: (row) => row.executive_committee,
        cell: (row, rowIndex) => {
          if (!row.is_officer) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.executive_committee}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Tax Identification Number",
        selector: (row) => row.tax_id_number,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {formatTIN(row.tax_id_number)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Type",
        selector: (row) => row.type,
        cell: (row, rowIndex) => {
          if (!row.is_stockholder) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.type}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Number",
        selector: (row) => row.number,
        cell: (row, rowIndex) => {
          if (!row.is_stockholder) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaOnly(row.number)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        cell: (row, rowIndex) => {
          if (!row.is_stockholder) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaAndDecimal(row.amount)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Percent of Ownership",
        selector: (row) => row.percent_of_ownership,
        cell: (row, rowIndex) => {
          if (row.is_stockholder || row.is_beneficial_ownership_declaration) {
            return (
              <div
                className={`w-full ${purpose == "update" && "cursor-pointer"}`}
                onClick={() => {
                  if (purpose == "update") {
                    handleAddIndividualDialog(row, rowIndex);
                  }
                }}
              >
                <Typography className="font-normal text-sm">
                  {formatNumberWithCommaAndDecimal(row.percent_of_ownership) +
                    "%"}
                </Typography>
              </div>
            );
          }
          return;
        },
      },
      {
        name: "Amount Paid",
        selector: (row) => row.amount_paid,
        cell: (row, rowIndex) => {
          if (!row.is_stockholder) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {formatNumberWithCommaAndDecimal(row.amount_paid)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Date of Birth",
        selector: (row) => row.date_of_birth,
        cell: (row, rowIndex) => {
          if (!row.is_beneficial_ownership_declaration) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {formattedDate(row.date_of_birth, true)}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Type of Beneficial Owner [Direct (D) or Indirect (I)]",
        selector: (row) => row.type_of_beneficial_owner,
        cell: (row, rowIndex) => {
          if (!row.is_beneficial_ownership_declaration) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.type_of_beneficial_owner}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "Category of Beneficial Ownership",
        selector: (row) => row.category_of_beneficial_ownership,
        cell: (row, rowIndex) => {
          if (!row.is_beneficial_ownership_declaration) return;
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleAddIndividualDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.category_of_beneficial_ownership}
              </Typography>
            </div>
          );
        },
      },
      {
        name: "",
        selector: (row) => null,
        width: "50px",
        cell: (row, rowIndex) => {
          if (purpose != "update") return;
          return (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <ButtonComponent
                className="bg-transparent"
                variant="text"
                onClick={() => {
                  const filteredData = formData.list_of_individuals.filter(
                    (_, idx) => idx != rowIndex
                  );
                  updatePercentOfOwnershipAddIndividual(filteredData);
                }}
              >
                <HiMinusCircle size={20} className="text-red-500" />
              </ButtonComponent>
            </div>
          );
        },
      },
    ];

    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <span></span>
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={() => {
                if (formData.auth_capital_stock.capital_stocks.length == 0) {
                  toast.error("Please update Authorized Capital Stock first.");
                  return;
                }
                handleIndividualDialog();
              }}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="flex flex-col items-end">
          {!showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={() => {
                // handleStockholdersDataDialog(
                //   document_state.stockholdersInformation
                // );
                // setSelectedStockholderIndex(-1);
                handleAddIndividualDialog(document_state.individualState);
                setSelectedIndividualIndex(-1);
              }}
            >
              Add row
            </ButtonComponent>
          )}
        </div>
        <GISTableComponent
          data={formData.list_of_individuals}
          columns={IndividualColumn}
        />
      </div>
    );
  };

  useEffect(() => {
    if (formData.corporate_name != "") {
      setUpdateData(formData);
    }
  }, [formData]);

  return (
    <div className="flex flex-col gap-1">
      {WarningMessage()}
      <Typography variant="small" className="font-normal text-sm">
        STEP THREE
      </Typography>

      <Typography variant="small" className="font-bold text-md">
        List of Individuals
      </Typography>

      <div className="flex flex-col py-5 gap-8">
        {IndividualFormComponent(formData, () => {}, true, true, "preview")}
        {directorsComponent()}
        {stockholdersInformationComponent()}
        {capitaStructureComponent(
          formData.subscribe_capital,
          "Subscribed Capital"
        )}
        {capitaStructureComponent(formData.paid_up_capital, "Paid Up Capital")}
        {BODPreviewComponent()}
      </div>

      <DialogComponent
        size="xl"
        dialogName={individualDialog}
        handlerDialog={handleIndividualDialog}
        title="List of Individuals"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleIndividualDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={toggleSaveIndividual}
            >
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          {IndividualFormComponent(
            updateData,
            handleOnChange,
            false,
            false,
            "update"
          )}
        </div>
      </DialogComponent>

      <DialogComponent
        size="md"
        dialogName={addIndividualDialog}
        handlerDialog={() => {
          handleAddIndividualDialog();
        }}
        title="Add Row"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={() => {
                handleAddIndividualDialog();
              }}
            >
              Cancel
            </ButtonComponent>

            {selectedIndividualIndex != -1 ? (
              <ButtonComponent
                className="bg-secondary"
                onClick={() => {
                  const updatedData = updateData.list_of_individuals.map(
                    (individual, index) => {
                      if (index == selectedIndividualIndex) {
                        return selectedIndividual;
                      }
                      return individual;
                    }
                  );

                  setUpdateData({
                    ...updateData,
                    list_of_individuals: updatedData,
                  });

                  handleAddIndividualDialog(document_state.individualState);
                }}
                disabled={
                  !selectedIndividual.is_beneficial_ownership_declaration &&
                  !selectedIndividual.is_stockholder &&
                  !selectedIndividual.is_officer
                }
              >
                Save
              </ButtonComponent>
            ) : (
              <ButtonComponent
                className="bg-secondary"
                onClick={toggleAddIndividual}
                disabled={
                  !selectedIndividual.is_beneficial_ownership_declaration &&
                  !selectedIndividual.is_stockholder &&
                  !selectedIndividual.is_officer
                }
              >
                Add
              </ButtonComponent>
            )}
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          <Typography variant="small" className="font-semibold text-sm">
            Select all tables that include this individual:
          </Typography>
          <div className="flex flex-col">
            <Checkbox
              label={
                <Typography variant="small" className="font-normal">
                  Directors/Officers
                </Typography>
              }
              className="font-normal text-sm"
              color="green"
              checked={selectedIndividual.is_officer}
              onChange={(e) => {
                setSelectedIndividual({
                  ...selectedIndividual,
                  is_officer: e.target.checked,
                });
              }}
            />
            <Checkbox
              label={
                <Typography variant="small" className="font-normal">
                  Stockholder's Information
                </Typography>
              }
              className="font-normal text-sm"
              color="green"
              checked={selectedIndividual.is_stockholder}
              onChange={(e) => {
                setSelectedIndividual({
                  ...selectedIndividual,
                  is_stockholder: e.target.checked,
                });
              }}
            />
            <Checkbox
              label={
                <Typography variant="small" className="font-normal">
                  Beneficial Ownership Declaration
                </Typography>
              }
              className="font-normal text-sm"
              color="green"
              checked={selectedIndividual.is_beneficial_ownership_declaration}
              onChange={(e) => {
                setSelectedIndividual({
                  ...selectedIndividual,
                  is_beneficial_ownership_declaration: e.target.checked,
                });
              }}
            />
          </div>

          {selectedIndividual.is_officer ||
          selectedIndividual.is_stockholder ||
          selectedIndividual.is_beneficial_ownership_declaration ? (
            <div className="flex flex-col gap-3">
              <InputComponent
                label="First Name"
                required
                onChange={handleOnChangeIndividual}
                value={selectedIndividual.first_name}
                name="first_name"
              />
              <InputComponent
                label="Middle Name"
                onChange={handleOnChangeIndividual}
                value={selectedIndividual.middle_name}
                name="middle_name"
              />
              <InputComponent
                label="Last Name"
                required
                onChange={handleOnChangeIndividual}
                value={selectedIndividual.last_name}
                name="last_name"
              />
              <InputComponent
                label="Nationality"
                required
                onChange={handleOnChangeIndividual}
                value={selectedIndividual.nationality}
                name="nationality"
              />
              <InputComponent
                label="Current Residential Address"
                required
                onChange={handleOnChangeIndividual}
                value={selectedIndividual.current_residential_address}
                name="current_residential_address"
              />
              <InputComponent
                label="Tax Identification Number"
                required
                onChange={handleOnChangeIndividual}
                value={selectedIndividual.tax_id_number}
                name="tax_id_number"
              />

              {/* Officer */}
              {selectedIndividual.is_officer && (
                <>
                  <SelectComponent
                    label="Incorporator"
                    name="incorporator"
                    value={selectedIndividual.incorporator}
                    options={[
                      { name: "Yes", value: "Y" },
                      { name: "No", value: "N" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        incorporator: value,
                      });
                    }}
                  />

                  <SelectComponent
                    label="Board"
                    name="board"
                    value={selectedIndividual.board}
                    options={[
                      { name: "C - Chairman", value: "C" },
                      { name: "M - Member", value: "M" },
                      { name: "I - Independent Director", value: "I" },
                      { name: "N/A - Not Applicable", value: "N/A" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        board: value,
                      });
                    }}
                  />

                  <SelectComponent
                    label="Gender"
                    name="gender"
                    value={selectedIndividual.gender}
                    options={[
                      { name: "Male", value: "M" },
                      { name: "Female", value: "F" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        gender: value,
                      });
                    }}
                  />

                  <SelectComponent
                    label="Stockholder"
                    name="stock_holder"
                    value={selectedIndividual.stock_holder}
                    options={[
                      { name: "Yes", value: "Y" },
                      { name: "No", value: "N" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        stock_holder: value,
                      });
                    }}
                  />

                  <SelectComponent
                    label="Officer"
                    name="officer"
                    value={selectedIndividual.officer}
                    options={[
                      { name: "President", value: "President" },
                      { name: "Treasurer", value: "Treasurer" },
                      {
                        name: "Corporate Secretary",
                        value: "Corporate Secretary",
                      },
                      {
                        name: "Corporate Secretary/Treasurer",
                        value: "Corporate Secretary/Treasurer",
                      },
                      {
                        name: "Assistant Corporate Secretary",
                        value: "Assistant Corporate Secretary",
                      },
                      {
                        name: "Assistant Corporate Secretary/Treasurer",
                        value: "Assistant Corporate Secretary/Treasurer",
                      },
                      { name: "N/A - Not Applicable", value: "N/A" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        officer: value,
                      });
                    }}
                  />

                  <SelectComponent
                    label="Executive Committee"
                    name="executive_committee"
                    value={selectedIndividual.executive_committee}
                    options={[
                      { name: "C - Compensation Committee", value: "C" },
                      {
                        name: "C/C - Chairman of the Compensation Committee",
                        value: "C/C",
                      },
                      {
                        name: "C/M - Member of the Compensation Committee",
                        value: "C/M",
                      },

                      { name: "A - Audit Committee", value: "A" },
                      {
                        name: "A/C - Chairman of the Audit Committee",
                        value: "A/C",
                      },
                      {
                        name: "A/M - Member of the Audit Committee",
                        value: "A/M",
                      },

                      {
                        name: "N - Nomination and Election Committee",
                        value: "N",
                      },
                      {
                        name: "N/C - Chairman of the Nomination and Election Committee",
                        value: "N/C",
                      },
                      {
                        name: "N/M - Member of the Nomination and Election Committee",
                        value: "N/M",
                      },
                      { name: "N/A - Not Applicable", value: "N/A" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        executive_committee: value,
                      });
                    }}
                  />
                </>
              )}

              {/* Stockholder */}
              {selectedIndividual.is_stockholder && (
                <>
                  <InputComponent
                    label="Type of Shares"
                    required
                    onChange={handleOnChangeIndividual}
                    value={selectedIndividual.type}
                    name="type"
                  />
                  <InputComponent
                    label="Number of Shares"
                    required
                    onChange={handleOnChangeIndividual}
                    value={selectedIndividual.number}
                    name="number"
                    type="number"
                  />
                  <InputComponent
                    label="Amount"
                    required
                    onChange={handleOnChangeIndividual}
                    value={selectedIndividual.amount}
                    name="amount"
                    type="number"
                  />
                </>
              )}
              {/* {(selectedIndividual.is_stockholder ||
                selectedIndividual.is_beneficial_ownership_declaration) && (
                <InputComponent
                  label="Percent of Ownership"
                  required
                  onChange={handleOnChangeIndividual}
                  value={selectedIndividual.percent_of_ownership}
                  name="percent_of_ownership"
                  type="number"
                />
              )} */}

              {selectedIndividual.is_stockholder && (
                <InputComponent
                  label="Amount Paid"
                  required
                  onChange={handleOnChangeIndividual}
                  value={selectedIndividual.amount_paid}
                  name="amount_paid"
                  type="number"
                />
              )}

              {/* BOD */}
              {selectedIndividual.is_beneficial_ownership_declaration && (
                <>
                  <InputComponent
                    label="Date of Birth"
                    required
                    onChange={handleOnChangeIndividual}
                    value={selectedIndividual.date_of_birth}
                    name="date_of_birth"
                    type="date"
                  />
                  <SelectComponent
                    label="Type of Beneficial Owner"
                    name="type_of_beneficial_owner"
                    value={selectedIndividual.type_of_beneficial_owner}
                    options={[
                      { name: "D - Direct", value: "D" },
                      { name: "I - Indirect", value: "I" },
                    ]}
                    onSelectChange={(value) => {
                      setSelectedIndividual({
                        ...selectedIndividual,
                        type_of_beneficial_owner: value,
                      });
                    }}
                  />
                  <InputComponent
                    label="Category of Beneficial Ownership"
                    required
                    onChange={handleOnChangeIndividual}
                    value={selectedIndividual.category_of_beneficial_ownership}
                    name="category_of_beneficial_ownership"
                  />
                </>
              )}
            </div>
          ) : (
            <Typography
              variant="small"
              className="font-normal text-sm text-red-500"
            >
              * Please select one or more table
            </Typography>
          )}
        </div>
      </DialogComponent>
    </div>
  );
};
