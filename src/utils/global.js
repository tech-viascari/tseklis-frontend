import moment from "moment";

// Function Definitions
export const formatIntegerWithComma = (integerPart) => {
  return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDecimalPlaces = (decimalPart) => {
  if (decimalPart === undefined) {
    return "00"; // No decimal part, return "00"
  }

  // Truncate or round to a maximum of four decimal places
  let formattedDecimalPart = decimalPart.substring(0, 4);

  // Ensure exactly two decimal places
  if (formattedDecimalPart.length === 0) {
    return "00"; // No decimal part at all
  } else if (formattedDecimalPart.length === 1) {
    return `${formattedDecimalPart}0`; // One decimal place, append one zero
  } else if (formattedDecimalPart.length === 2) {
    return `${formattedDecimalPart}`; // Two decimal places
  } else if (formattedDecimalPart.length === 3) {
    return `${formattedDecimalPart}`; // Three decimal places
  } else {
    return formattedDecimalPart; // Four decimal places or more, no extra padding needed
  }
};

export const formatNumberWithCommaAndDecimal = (number) => {
  if (number == null || number == "") return "0.00";
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  const formattedIntegerPart = formatIntegerWithComma(integerPart);
  const formattedDecimalPart = formatDecimalPlaces(decimalPart);
  return `${formattedIntegerPart}.${formattedDecimalPart}`;
};

export const formattedDate = (date) => {
  if (!date) {
    return "";
  }
  return moment(date).format("LL");
};
