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

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const usStates = new UsaStates();
  const [CardHolderName, setCardHolderName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userState, setUserState] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [isTouched, setIsTouched] = useState(false);

  const [cardDetailsErrors, setCardDetailsErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleCheckboxChange = (e) => {
    setIsTouched(true);

    // Check for errors in card details
    const hasCardErrors = Object.values(cardDetailsErrors).some(
      (error) => error
    );
    const hasOtherErrors = Object.values(inputErrors).some((error) => error);

    // Perform the rest of the validation
    const validationErrors = PaymentInputValidation(
      CardHolderName,
      zipCode,
      userState
    );

    setInputErrors(validationErrors);

    if (!hasCardErrors && !hasOtherErrors) {
      setIsChecked(e.target.checked);
    } else {
      setIsChecked(false);
    }
  };

  const updateFormFieldsDisabling = (disable) => {
    if (elements) {
      elements.getElement(CardNumberElement).update({ disabled: disable });
      elements.getElement(CardExpiryElement).update({ disabled: disable });
      elements.getElement(CardCvcElement).update({ disabled: disable });
    }

    // Additional code to disable other input fields if required
  };

  const handleCardChange = (event) => {
    setCardDetailsErrors({
      ...cardDetailsErrors,
      [event.elementType]: event.error ? event.error.message : "",
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

    // Call Stripe's validation for card elements here if needed

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
      // No errors and the checkbox is checked, proceed with payment logic
      // TODO: Add payment logic here
    }
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
        <div className="w-full lg:w-1/2 px-4">
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
                    defaultValue=""
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

              <button
                type="submit"
                disabled={!isChecked}
                className={`w-full px-3 py-4 text-white bg-blue-500 rounded-md focus:outline-none ${
                  !isChecked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
