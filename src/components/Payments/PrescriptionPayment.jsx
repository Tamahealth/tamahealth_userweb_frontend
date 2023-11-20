import React, { useState } from "react";
import "@stripe/stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { UsaStates } from "usa-states";
import { PaymentInputValidation } from "./PaymentInputValidation";
import { PaymentHandler } from "./PaymentHandler";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState(50);
  const usStates = new UsaStates();
  const [CardHolderName, setCardHolderName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userState, setUserState] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [isTouched, setIsTouched] = useState(false);
  // States to track if user interacted with card fields
  const [cardNumberTouched, setCardNumberTouched] = useState(false);
  const [cardExpiryTouched, setCardExpiryTouched] = useState(false);
  const [cardCvcTouched, setCardCvcTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For spinner

  const [cardDetailsErrors, setCardDetailsErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleCheckboxChange = (e) => {
    setIsTouched(true);

    // Perform the rest of the validation
    const validationErrors = PaymentInputValidation(
      CardHolderName,
      zipCode,
      userState
    );

    // Check for errors in card details
    // Check if all card fields have been interacted with
    const allCardFieldsTouched =
      cardNumberTouched && cardExpiryTouched && cardCvcTouched;
    const hasCardErrors = Object.values(cardDetailsErrors).some(
      (error) => error
    );
    const hasOtherErrors = Object.values(inputErrors).some((error) => error);

    setInputErrors(validationErrors);

    if (allCardFieldsTouched && !hasCardErrors && !hasOtherErrors) {
      setIsChecked(e.target.checked);
      updateFormFieldsDisabling(e.target.checked);
    } else {
      setIsChecked(false);
    }
  };

  const updateFormFieldsDisabling = (disable) => {
    if (elements) {
      elements.getElement(CardNumberElement)?.update({ disabled: disable });
      elements.getElement(CardExpiryElement)?.update({ disabled: disable });
      elements.getElement(CardCvcElement)?.update({ disabled: disable });
    }
  };

  const handleCardChange = (event) => {
    // Update the touched state immediately when the user interacts with the card fields
    if (event.elementType === "cardNumber") {
      setCardNumberTouched(true);
    } else if (event.elementType === "cardExpiry") {
      setCardExpiryTouched(true);
    } else if (event.elementType === "cardCvc") {
      setCardCvcTouched(true);
    }

    // Set error message based on Stripe's event.error and the touched state
    let errorMessage = "";
    if (!event.complete && event.error) {
      errorMessage = event.error.message;
    } else if (
      !event.complete &&
      event.elementType === "cardNumber" &&
      cardNumberTouched
    ) {
      errorMessage = "Card number is required.";
    } else if (
      !event.complete &&
      event.elementType === "cardExpiry" &&
      cardExpiryTouched
    ) {
      errorMessage = "Expiry date is required.";
    } else if (
      !event.complete &&
      event.elementType === "cardCvc" &&
      cardCvcTouched
    ) {
      errorMessage = "CVC is required.";
    }

    setCardDetailsErrors({
      ...cardDetailsErrors,
      [event.elementType]: errorMessage,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "CardHolderName") {
      setCardHolderName(value);
    } else if (name === "postalCode") {
      setZipCode(value);
    } else if (name === "state") {
      setUserState(value);
    }

    // Call validation function here if you want immediate feedback on errors
    const validationErrors = PaymentInputValidation(
      name === "CardHolderName" ? value : CardHolderName,
      name === "postalCode" ? value : zipCode,
      name === "state" ? value : userState
    );
    setInputErrors(validationErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTouched(true);
    setIsLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    // Validate the card details and other input fields
    const cardErrors = {
      cardNumber: cardDetailsErrors.cardNumber,
      cardExpiry: cardDetailsErrors.cardExpiry,
      cardCvc: cardDetailsErrors.cardCvc,
    };

    const validationErrors = PaymentInputValidation(
      CardHolderName,
      zipCode,
      userState,
      cardErrors
    );

    setInputErrors(validationErrors);

    if (
      Object.keys(validationErrors).length === 0 &&
      isChecked &&
      !Object.values(cardErrors).some((error) => error)
    ) {
      // If no errors, proceed with the payment
      try {
        const amountInCents = amount * 100; // Convert amount to cents for Stripe
        const serviceId = "your-service-id"; // Replace with actual service ID
        const userId = "your-user-id"; // Replace with actual user ID

        // Call the payment handler function
        const paymentResult = await PaymentHandler.handlePaymentSubmission(
          amountInCents,
          serviceId,
          userId,
          cardNumberElement,
          CardHolderName,
          zipCode
        );

        // Check the payment status and handle accordingly
        if (paymentResult.error) {
          // Handle payment errors (e.g., card declined)
          console.error(paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === "succeeded") {
          // Handle successful payment
          console.log("Payment succeeded!");
        } else {
          // Handle other payment statuses as needed
          console.log(paymentResult.paymentIntent.status);
        }
      } catch (error) {
        // Handle any other errors
        console.error("Payment failed:", error);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
          {/* Placeholder for payment details */}
          <div className="bg-white p-5 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Service Description</h2>
            {/* Replace this section with your service description and image */}
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-4 lg:max-w-lg mx-auto">
          <div className="bg-white p-5 rounded-md shadow-sm">
            <div className="text-center mb-10">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">
                Payment
              </h1>
              <p className="text-gray-400">
                Fill in your card details to proceed with the payment.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  id="name"
                  name="CardHolderName"
                  placeholder="John Doe"
                  value={CardHolderName}
                  onChange={handleInputChange}
                  disabled={isChecked}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />

                {inputErrors.cardHolderName && (
                  <p className="text-red-500 text-xs italic">
                    {inputErrors.cardHolderName}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-600">
                  Card Number
                </label>
                <CardNumberElement
                  onChange={handleCardChange}
                  className="p-3 border border-gray-300 rounded-md"
                />

                {cardDetailsErrors.cardNumber && (
                  <p className="text-red-500 text-xs italic">
                    {cardDetailsErrors.cardNumber}
                  </p>
                )}
              </div>

              <div className="flex mb-6 -mx-2">
                <div className="w-1/2 px-2">
                  <label className="block mb-2 text-sm text-gray-600">
                    Expiry Date
                  </label>
                  <CardExpiryElement
                    onChange={handleCardChange}
                    className="p-3 border border-gray-300 rounded-md"
                  />

                  {cardDetailsErrors.cardExpiry && (
                    <p className="text-red-500 text-xs italic">
                      {cardDetailsErrors.cardExpiry}
                    </p>
                  )}
                </div>
                <div className="w-1/2 px-2">
                  <label className="block mb-2 text-sm text-gray-600">
                    CVC
                  </label>
                  <CardCvcElement
                    onChange={handleCardChange}
                    className="p-3 border border-gray-300 rounded-md"
                  />

                  {cardDetailsErrors.cardCvc && (
                    <p className="text-red-500 text-xs italic">
                      {cardDetailsErrors.cardCvc}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex mb-6 -mx-2">
                <div className="w-2/3 px-2">
                  <label
                    htmlFor="postal-code"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal-code"
                    name="postalCode"
                    value={zipCode}
                    onChange={handleInputChange}
                    disabled={isChecked}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  {inputErrors.zipCode && (
                    <p className="text-red-500 text-xs italic">
                      {inputErrors.zipCode}
                    </p>
                  )}
                </div>
                {/* US states */}
                <div className="w-1/3 px-2">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    // defaultValue=""
                    value={userState}
                    disabled={isChecked}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {usStates.states.map((state) => (
                      <option
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {inputErrors.userState && (
                    <p className="text-red-500 text-xs italic">
                      {inputErrors.userState}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />

                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the terms and conditions
                </label>
              </div>
              {isLoading && <div className="spinner">Loading...</div>}
              <button
                type="submit"
                disabled={!isChecked || isLoading}
                className={`w-full px-3 py-4 text-white bg-blue-500 hover:bg-blue-900 rounded-md focus:outline-none ${
                  !isChecked || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : `Pay $${amount}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
