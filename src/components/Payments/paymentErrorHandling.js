// paymentErrorHandling.js

const paymentErrorMessages = {
  card_declined: "Your card was declined. Please use a different card.",
  insufficient_funds: "Your card has insufficient funds.",
  lost_card: "This card has been reported lost. Please use a different card.",
  stolen_card:
    "This card has been reported stolen. Please use a different card.",
  expired_card: "Your card has expired. Please use a different card.",
  incorrect_cvc: "The CVC number is incorrect. Please try again.",
  processing_error: "There was a processing error. Please try again.",
  incorrect_number: "The card number is incorrect. Please try again.",
  card_velocity_exceeded:
    "The card's velocity limit has been exceeded. Please try again later or use a different card.",
  generic_decline:
    "The card was declined for an unknown reason. Please use a different card.",
};

export const getPaymentErrorMessage = (errorType) => {
  return (
    paymentErrorMessages[errorType] ||
    "An unknown error occurred. Please try again."
  );
};
