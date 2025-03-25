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

export const formatNumberWithCommaOnly = (number) => {
  if (number == null || number == "") return "";
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  if (decimalPart != undefined) {
    const formattedInteger = formatIntegerWithComma(integerPart);
    const formattedDecimal = decimalPart.substring(0, 4);
    return `${formattedInteger}.${formattedDecimal}`;
  }
  return formatIntegerWithComma(integerPart);
};

export const formattedDate = (date) => {
  if (!date) {
    return "";
  }
  return moment(date).format("LL");
};

export const getName = (fullName) => {
  if (fullName == " " || !fullName) return;

  const [firstName, ...lastNameParts] = fullName.split(" ");

  const lastNameInitial = lastNameParts[lastNameParts.length - 1].charAt(0);

  return `${firstName} ${lastNameInitial}.`;
};

export const handleOnChange = (
  e,
  formData,
  setFormData,
  errors,
  setErrors,
  error_message,
  setIsDirty,
  required = true
) => {
  const { name, value } = e.target;

  setFormData({ ...formData, [name]: value });

  if (value === "" && required) {
    setErrors({ ...errors, [name]: error_message });
  } else {
    setErrors({ ...errors, [name]: "" });
  }

  setIsDirty(true);
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const shortName = (modified_by) => {
  if (modified_by != null && modified_by != "") {
    let fullname = modified_by.split(" ");

    if (fullname.length == 1 && fullname[0] != undefined) {
      modified_by = fullname[0];
    } else if (
      fullname.length == 2 &&
      fullname[0] != undefined &&
      fullname[1][0] != undefined
    ) {
      modified_by = `${fullname[0]} ${fullname[1][0]}`;
    } else if (fullname.length > 2 && fullname[0] != undefined) {
      if (fullname[fullname.length - 1][0] != undefined) {
        modified_by = `${fullname[0]} ${fullname[fullname.length - 1][0]}`;
      } else if (fullname[fullname.length - 2][0] != undefined) {
        modified_by = `${fullname[0]} ${fullname[fullname.length - 2][0]}`;
      } else {
        modified_by = `${fullname[0]}`;
      }
    }
  }

  return modified_by;
};
