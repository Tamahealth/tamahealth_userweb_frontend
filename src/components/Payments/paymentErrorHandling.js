const getStripeErrorMessage = (error) => {
  if (error.code === "card_declined" && error.decline_code) {
    // Handling specific decline codes
    switch (error.decline_code) {
      case "insufficient_funds":
        return "Insufficient funds in your account to complete this payment.";
      case "lost_card":
        return "The card has been reported as lost. Please use a different card.";
      case "stolen_card":
        return "The card has been reported as stolen. Please use a different card.";
      case "expired_card":
        return "Your card has expired. Please use a different card.";
      case "incorrect_cvc":
        return "The card’s security code is incorrect. Please check and try again.";
      // Add other specific decline codes as needed
      default:
        return "Your card was declined. Please check your card details or try a different card.";
    }
  }

  // Handling other error codes
  switch (error.code) {
    case "expired_card":
      return "Your card has expired. Please use a different card.";
    case "incorrect_cvc":
      return "The card’s security code is incorrect. Please check and try again.";
    case "processing_error":
      return "An error occurred while processing the card. Please try again later.";
    case "invalid_number":
      return "The card number is invalid. Please check the card details.";
    default:
      return "An error occurred during payment. Please try again.";
  }
};

export default getStripeErrorMessage;
