import { Card, Radio, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import TextAreaComponent from "../../../../../components/TextAreaComponent";
import DialogComponent from "../../../../../components/DialogComponent";
import TableComponent from "../../../../../components/TableComponent";
import useGISDocumentStore from "../../../../../store/useGISDocumentStore";
import { HiMinusCircle } from "react-icons/hi2";
import GISTableComponent from "../../../../../components/GISTableComponent";
import {
  formatNumberWithCommaAndDecimal,
  formatNumberWithCommaOnly,
} from "../../../../../utils/global";

export const CapitalStructureForm = ({
  formData,
  setFormData,
  errors,
  onChange,
}) => {
  const [updateData, setUpdateData] = useState(formData);

  const { document_state } = useGISDocumentStore();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [authCapital, setAuthCapital] = useState({
    ...document_state.authCapitalStock,
  });

  const [selectedStockholder, setSelectedStockholder] = useState({
    ...document_state.stockholdersInformation,
  });

  const [selectedStockholderIndex, setSelectedStockholderIndex] = useState(-1);

  const [submitDialog, setSubmitDialog] = useState(false);
  const handleSubmitDialog = () => {
    setSubmitDialog(!submitDialog);
  };

  const [authCapitalDialog, setAuthCapitalDialog] = useState(false);
  const handleAuthCapitalDialog = () => {
    setAuthCapitalDialog(!authCapitalDialog);
  };

  const [stockholdersInformationDialog, setStockholdersInformationDialog] =
    useState(false);
  const handleStockholdersInformationDialog = () => {
    setStockholdersInformationDialog(!stockholdersInformationDialog);
  };

  const [stockholdersDataDialog, setStockholdersDataDialog] = useState(false);
  const handleStockholdersDataDialog = (row, rowIndex = -1) => {
    if (row != undefined) {
      setSelectedStockholder(row);
      setSelectedStockholderIndex(rowIndex);
    }
    handleStockholdersInformationDialog();
    setStockholdersDataDialog(!stockholdersDataDialog);
  };

  const handleSubmit = async () => {
    console.log("submit");
    setFormData(updateData);

    setStockholdersInformationDialog(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleAuthCapitalOnChange = (e) => {
    const { name, value } = e.target;

    const multiplier =
      name == "number_of_shares"
        ? Number(authCapital.par_or_stated_value)
        : Number(authCapital.number_of_shares);

    const amount =
      name == "number_of_shares" || name == "par_or_stated_value"
        ? multiplier * Number(value)
        : authCapital.amount;

    setAuthCapital({ ...authCapital, [name]: value, amount });
  };

  const handleSelectedStockholderOnChange = (e) => {
    const { name, value } = e.target;

    setSelectedStockholder({ ...selectedStockholder, [name]: value });
  };

  const handleFormSave = () => {
    setFormData(updateData);
    setAuthCapitalDialog(false);
  };

  const authCapitalColumn = [
    {
      name: "Type of Shares",
      selector: (row) => {
        if (row.type_of_shares == "TOTAL") {
          return (
            <Typography className="font-semibold text-sm">TOTAL</Typography>
          );
        }
        return row.type_of_shares;
      },
    },
    {
      name: "Number of Shares",
      selector: (row) => formatNumberWithCommaOnly(row.number_of_shares),
    },
    {
      name: "Par/Stated Value",
      selector: (row) => {
        if (row.par_or_stated_value == "TOTAL P") {
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
  ];

  const authCapitalStock = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    // const GISTableComponent = ()

    const tableData =
      formData.auth_capital_stock.capital_stocks.length != 0
        ? [
            ...formData.auth_capital_stock.capital_stocks,
            {
              type_of_shares: "TOTAL",
              number_of_shares: formatNumberWithCommaOnly(
                formData.auth_capital_stock.total_number_of_shares
              ),
              par_or_stated_value: "TOTAL P",
              amount: formatNumberWithCommaAndDecimal(
                formData.auth_capital_stock.total_amount
              ),
            },
          ]
        : [];

    return (
      <div>
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Authorized Capital Stock
          </Typography>
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleAuthCapitalDialog}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="pt-3">
          <GISTableComponent
            customRowStyle
            data={tableData}
            columns={authCapitalColumn}
          />
        </div>
      </div>
    );
  };

  const handleSubmitStockholder = async () => {
    const stockholdersData = updateData.stock_holders_information.information;

    const updated = updateStockHoldersData(stockholdersData);

    setFormData({
      ...updated,
      total_assets_based_on_latest_audited:
        updateData.total_assets_based_on_latest_audited,
    });

    setStockholdersInformationDialog(false);
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

    const newFormStep5 = {
      ...formData,
      stock_holders_information: {
        ...formData.stock_holders_information,
        information: newStockHoldersData,
      },
      subscribe_capital: updatedCapitalStructure.subscribe_capital,
      paid_up_capital: updatedCapitalStructure.paid_up_capital,
      total_number_of_stockholders: stockholders.length,
      number_of_stockholders_with_more_shares_each,
    };

    return newFormStep5;
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

      paidUpCapitalFilipino = paidUpCapitalFilipino.map((paidup) => {
        paidup.percent_of_ownership =
          (paidup.amount / subscribedCapital.total_amount) * 100;

        paid_up_sub_total_ownership_filipino += paidup.percent_of_ownership;

        return paidup;
      });

      paidUpCapitalForeign = paidUpCapitalForeign.map((paidup) => {
        paidup.percent_of_ownership =
          (paidup.amount / subscribedCapital.total_amount) * 100;

        paid_up_sub_total_ownership_foreign += paidup.percent_of_ownership;

        return paidup;
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

  const computeForStockholder = (stockholders) => {
    let total_amount = 0;

    stockholders.forEach((stockholder) => {
      total_amount += Number(stockholder.amount);
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

    return newStockHoldersData;
  };

  const stockholdersInformation = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose
  ) => {
    const stockholdersInformationColumn = [
      {
        name: "Name",
        selector: (row) => row.name,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
                }
              }}
            >
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
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
                }
              }}
            >
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
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
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
        name: "Type",
        selector: (row) => row.type,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
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
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
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
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
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
        name: "% of Ownership",
        selector: (row) => row.percent_of_ownership,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
                }
              }}
            >
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
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
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
        name: "Tax Identification Number",
        selector: (row) => row.tax_id_number,
        cell: (row, rowIndex) => {
          return (
            <div
              className={`w-full ${purpose == "update" && "cursor-pointer"}`}
              onClick={() => {
                if (purpose == "update") {
                  handleStockholdersDataDialog(row, rowIndex);
                }
              }}
            >
              <Typography className="font-normal text-sm">
                {row.tax_id_number}
              </Typography>
            </div>
          );
        },
      },

      {
        name: "",
        selector: (row) => null,
        cell: (row, rowIndex) => {
          if (purpose == "preview") return null;
          return (
            <ButtonComponent
              className=" bg-transparent"
              onClick={() => {
                const filteredData =
                  updateData.stock_holders_information.information.filter(
                    (_, index) => index != rowIndex
                  );

                setUpdateData({
                  ...updateData,
                  stock_holders_information: {
                    ...updateData.stock_holders_information,
                    information: filteredData,
                  },
                });
              }}
            >
              <HiMinusCircle size={20} className="text-red-500" />
            </ButtonComponent>
          );
        },
      },
    ];

    return (
      <div>
        <div className="flex flex-row justify-between items-center">
          <Typography variant="small" className="font-semibold text-sm">
            Stockholders Information
          </Typography>
          {showOpen && (
            <ButtonComponent
              className="py-1 text-gray"
              variant="outlined"
              onClick={handleStockholdersInformationDialog}
            >
              Update Details
            </ButtonComponent>
          )}
        </div>
        <div className="pt-3 flex flex-col gap-3">
          <div className="grid grid-cols-4">
            <div className="col-span-4 md:col-span-2">
              <InputComponent
                label="Total Assets Based on Latest Audited Financial Statements"
                name="total_assets_based_on_latest_audited"
                required
                value={formData.total_assets_based_on_latest_audited}
                onChange={handleOnChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            {!showOpen && (
              <ButtonComponent
                className="py-1 text-gray"
                variant="outlined"
                onClick={() => {
                  handleStockholdersDataDialog(
                    document_state.stockholdersInformation
                  );
                  setSelectedStockholderIndex(-1);
                }}
              >
                Add row
              </ButtonComponent>
            )}
          </div>
          <GISTableComponent
            customRowStyle
            data={formData.stock_holders_information.information}
            columns={stockholdersInformationColumn}
          />
        </div>
      </div>
    );
  };

  const Capital = (
    formData,
    onChange = () => {},
    disabled = false,
    showOpen = false,
    purpose,
    capital,
    capitalName
  ) => {
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

  useEffect(() => {
    if (formData.corporate_name != "") {
      setUpdateData(formData);
    }
  }, [formData]);

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="small" className="font-normal text-sm">
        STEP TWO
      </Typography>
      <Typography variant="small" className="font-bold text-md">
        Capital Structure
      </Typography>
      <div className="flex flex-col py-5 gap-8">
        {authCapitalStock(formData, handleOnChange, true, true, "preview")}
        {stockholdersInformation(
          formData,
          handleOnChange,
          true,
          true,
          "preview"
        )}
        {Capital(
          formData,
          handleOnChange,
          true,
          true,
          "preview",
          formData.subscribe_capital,
          "Subscribed Capital"
        )}
        {Capital(
          formData,
          handleOnChange,
          true,
          true,
          "preview",
          formData.paid_up_capital,
          "Paid Up Capital"
        )}
      </div>

      <DialogComponent
        size="lg"
        dialogName={authCapitalDialog}
        handlerDialog={handleAuthCapitalDialog}
        title="Update Authorized Capital Stock"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleAuthCapitalDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              className="bg-secondary"
              onClick={() => {
                setFormData({
                  ...formData,
                  auth_capital_stock: {
                    capital_stocks: [authCapital],
                    total_amount: authCapital.amount,
                    total_number_of_shares: authCapital.number_of_shares,
                  },
                });

                setAuthCapitalDialog(false);
              }}
            >
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          <InputComponent
            label="Type of Shares"
            name="type_of_shares"
            required
            value={authCapital.type_of_shares}
            onChange={handleAuthCapitalOnChange}
          />
          <InputComponent
            label="Number of Shares"
            type="number"
            required
            name="number_of_shares"
            value={authCapital.number_of_shares}
            onChange={handleAuthCapitalOnChange}
          />
          <InputComponent
            label="Par/Stated Value"
            type="number"
            required
            name="par_or_stated_value"
            value={authCapital.par_or_stated_value}
            onChange={handleAuthCapitalOnChange}
          />
          <InputComponent
            label="Amount"
            type="number"
            disabled
            required
            name="amount"
            value={authCapital.amount}
            onChange={handleAuthCapitalOnChange}
          />
        </div>
      </DialogComponent>

      <DialogComponent
        size="xl"
        dialogName={stockholdersInformationDialog}
        handlerDialog={handleStockholdersInformationDialog}
        title="Update Details"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleStockholdersInformationDialog}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={handleSubmitStockholder}
            >
              Save
            </ButtonComponent>
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          {stockholdersInformation(
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
        dialogName={stockholdersDataDialog}
        handlerDialog={handleStockholdersDataDialog}
        title={`${
          selectedStockholderIndex != -1 ? "Update" : "Add"
        } Stockholder's Information`}
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <div className="flex flex-row gap-3">
              <ButtonComponent
                className="bg-red-400"
                onClick={handleStockholdersDataDialog}
              >
                Cancel
              </ButtonComponent>

              {selectedStockholderIndex != -1 ? (
                <ButtonComponent
                  className="bg-secondary"
                  onClick={() => {
                    const updatedStockholder =
                      updateData.stock_holders_information.information.map(
                        (stockholder, index) => {
                          if (index == selectedStockholderIndex) {
                            return selectedStockholder;
                          }
                          return stockholder;
                        }
                      );

                    const computedStockholder =
                      computeForStockholder(updatedStockholder);

                    setUpdateData({
                      ...updateData,
                      stock_holders_information: {
                        ...updateData.stock_holders_information,
                        information: computedStockholder,
                      },
                    });
                    handleStockholdersDataDialog(
                      document_state.stockholdersInformation,
                      -1
                    );
                  }}
                >
                  Save
                </ButtonComponent>
              ) : (
                <ButtonComponent
                  className="bg-secondary"
                  onClick={() => {
                    const stockholders = [
                      ...updateData.stock_holders_information.information,
                      selectedStockholder,
                    ];

                    const computedStockholder =
                      computeForStockholder(stockholders);

                    setUpdateData({
                      ...updateData,
                      stock_holders_information: {
                        ...updateData.stock_holders_information,
                        information: computedStockholder,
                      },
                    });

                    handleStockholdersDataDialog(
                      document_state.stockholdersInformation
                    );
                  }}
                >
                  Add
                </ButtonComponent>
              )}
            </div>
          </div>
        }
      >
        <div className="w-full grid grid-cols-1 gap-3">
          <InputComponent
            label="Name"
            name="name"
            required
            value={selectedStockholder.name}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Nationality"
            name="nationality"
            required
            value={selectedStockholder.nationality}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Current Residential Address"
            name="current_residential_address"
            required
            value={selectedStockholder.current_residential_address}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Type"
            name="type"
            required
            value={selectedStockholder.type}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Number of Shares"
            name="number"
            type="number"
            required
            value={selectedStockholder.number}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Amount"
            name="amount"
            type="number"
            required
            value={selectedStockholder.amount}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Amount Paid in PHP"
            name="amount_paid"
            type="number"
            required
            value={selectedStockholder.amount_paid}
            onChange={handleSelectedStockholderOnChange}
          />
          <InputComponent
            label="Tax Identification Number"
            name="tax_id_number"
            required
            value={selectedStockholder.tax_id_number}
            onChange={handleSelectedStockholderOnChange}
          />
        </div>
      </DialogComponent>

      <DialogComponent
        dialogName={submitDialog}
        handlerDialog={handleSubmitDialog}
        title="Add New Quote"
        footerContent={
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <ButtonComponent
              className="bg-red-400"
              onClick={handleSubmitDialog}
            >
              No
            </ButtonComponent>

            <ButtonComponent
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              className="bg-secondary"
              onClick={handleSubmit}
            >
              Yes
            </ButtonComponent>
          </div>
        }
      >
        <Typography variant="small" className="font-normal text-sm">
          Are you sure you want to add this record?
        </Typography>
      </DialogComponent>
    </div>
  );
};
