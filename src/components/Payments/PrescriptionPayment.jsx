import React, { useState, useEffect } from "react";
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
import PaymentHandler from "./PaymentHandler";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import PaymentSuccess from "./PaymentSuccess";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";
import {
  submitFormData,
  // testSplitFormData,
} from "../PrescriptionForm/form-utils/helpers";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { serviceId } = useParams();

  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const usStates = new UsaStates(); // For US states
  const [CardHolderName, setCardHolderName] = useState(""); // Card holder name
  const [zipCode, setZipCode] = useState(""); // US zip code
  const [userState, setUserState] = useState(""); // US state
  const [inputErrors, setInputErrors] = useState({}); // For validation
  const [isTouched, setIsTouched] = useState(false); // For validation
  // States to track if user interacted with card fields
  const [cardNumberTouched, setCardNumberTouched] = useState(false);
  const [cardExpiryTouched, setCardExpiryTouched] = useState(false);
  const [cardCvcTouched, setCardCvcTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For spinner
  const [paymentError, setPaymentError] = useState(""); // For error message
  const [cardDetailsErrors, setCardDetailsErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardBrand, setCardBrand] = useState("");

  useEffect(() => {
    console.log("Current payment error:", paymentError);
  }, [paymentError]);

  useEffect(() => {
    if (serviceId) {
      PaymentHandler.fetchServiceDetails(serviceId)
        .then((serviceDetails) => {
          setAmount(serviceDetails.price * 100);
        })
        .catch((error) => {
          console.error("Error fetching service details:", error);
        });
    } else {
      console.log("Service ID is undefined");
    }
  }, [serviceId]);

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
      if (event.brand) {
        setCardBrand(event.brand);
      }
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

  const renderCardIcon = (brand) => {
    switch (brand) {
      case "visa":
        return <FaCcVisa style={{ margin: 4, width: 40, height: 24 }} />;
      case "mastercard":
        return <FaCcMastercard style={{ margin: 4, width: 40, height: 24 }} />;
      case "amex":
        return <FaCcAmex style={{ margin: 4, width: 100, height: 24 }} />;
      case "discover":
        return <FaCcDiscover style={{ margin: 4, width: 40, height: 24 }} />;
      default:
        return null;
    }
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
    setIsLoading(true);
    setIsTouched(true);
    setPaymentError("");
    const userId = localStorage.getItem("userId");

    // console.log("Service ID:", serviceId, "User ID:", userId);

    const validationErrors = PaymentInputValidation(
      CardHolderName,
      zipCode,
      userState
    );

    setInputErrors(validationErrors);

    // console.log("Validation Errors:", validationErrors);
    // console.log("Is Checkbox Checked:", isChecked);

    if (Object.keys(validationErrors).length === 0 && isChecked) {
      console.log("All conditions met. Proceeding to payment submission");

      try {
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        // Use the stripe instance from useStripe hook
        const result = await PaymentHandler.handlePaymentSubmission(
          serviceId,
          userId,
          {
            cardNumberElement,
            cardExpiryElement,
            cardCvcElement,
            cardHolderName: CardHolderName,
            zipCode,
            userState,
          },
          stripe
        );

        console.log("Payment result:", result);

        if (result.success) {
          console.log("Payment succeeded!");
          setPaymentSuccess(true);
          const formData = JSON.parse(localStorage.getItem("formData"));
          await submitFormData(formData);
        } else {
          console.error("Payment failed:", result.error);
          if (result.error.message) {
            setPaymentError(result.error.message);
          } else {
            setPaymentError("An unknown error occurred. Please try again.");
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Payment submission error:", error);
        setPaymentError("An error occurred during payment submission.");
        setIsLoading(false);
      }
    } else {
      console.log("Conditions not met for payment submission");
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
                <div className="flex items-center border border-gray-300 rounded-md">
                  <CardNumberElement
                    onChange={handleCardChange}
                    className="p-3 flex-grow text-lg"
                  />
                  <div className="p-3">{renderCardIcon(cardBrand)}</div>
                </div>
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
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <CardCvcElement
                      onChange={handleCardChange}
                      className="p-3 flex-grow text-lg" // Increased font size
                    />
                    <div className="p-1 text-xl mr-4">
                      <BsCreditCard />
                    </div>
                  </div>
                  {cardDetailsErrors.cardCvc && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {" "}
                      {/* Moved error message below input */}
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
                  <label className="block mb-2 text-sm text-gray-600">
                    State
                  </label>
                  <select
                    htmlFor="state"
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
              {isLoading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
                  <Loading />
                </div>
              )}

              {paymentSuccess && <PaymentSuccess />}
              <button
                type="submit"
                disabled={!isChecked || isLoading}
                className={`w-full px-3 py-4 text-white bg-blue-500 hover:bg-blue-900 rounded-md focus:outline-none ${
                  !isChecked || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : `Pay $${amount / 100}`}
              </button>
            </form>
            {!isLoading && paymentError && (
              <div className="text-red-500 text-center mt-2 ">
                {paymentError}
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs">
              Payments are securely processed by Stripe.
            </p>
            {/* <button
              className="text-blue-500 hover:text-blue-700 text-xs"
              onClick={() => {
                testSplitFormData();
              }}
            >
              {" "}
              Test split data
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
