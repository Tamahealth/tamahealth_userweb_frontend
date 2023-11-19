export const PaymentInputValidation = (
  cardHolderName,
  zipCode,
  userState,
  cardDetailsErrors
) => {
  let errors = { ...cardDetailsErrors };

  // Cardholder's name validation
  if (!cardHolderName.trim()) {
    errors.cardHolderName = "Name on card is required.";
  } else if (!/^[A-Za-z]+( [A-Za-z]+)+$/.test(cardHolderName.trim())) {
    errors.cardHolderName =
      "Please enter both first and last name without digits or invalid name characters.";
  }

  // Zip code validation
  if (!zipCode.trim()) {
    errors.zipCode = "ZIP code is required.";
  } else if (!/^\d{5}$/.test(zipCode.trim())) {
    errors.zipCode = "ZIP code must be exactly 5 digits.";
  }

  // State validation - ensure the value isn't the placeholder value
  if (!userState || userState === "") {
    errors.userState = "State selection is required.";
  }

  return errors;
};
