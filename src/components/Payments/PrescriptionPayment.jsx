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

function validatePaymentForm(name, zipCode) {
  let errors = {};

  if (!name.trim()) {
    errors.name = "Name on card is required.";
  } else {
    // Split the name by spaces to check for first and last name
    const nameParts = name.trim().split(" ");
    // Check for at least two name parts and no digits in the name
    if (nameParts.length < 2 || /\d/.test(name)) {
      errors.name =
        "Please enter your full name (first and last name) without numbers or special characters.";
    }
  }

  if (!zipCode.trim()) {
    errors.zipCode = "ZIP code is required.";
  } else if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
    errors.zipCode = "Invalid ZIP code. Please enter a valid ZIP code.";
  }

  return errors;
}

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const usStates = new UsaStates();
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userState, setUserState] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handleCheckboxChange = (e) => {
    e.preventDefault();
    const errors = validatePaymentForm(name, zipCode, userState);
    setInputErrors(errors);
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Implement payment logic here
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
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                {inputErrors.name && (
                  <p className="text-red-500 text-xs italic">
                    {inputErrors.name}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-600">
                  Card Number
                </label>
                <CardNumberElement className="p-3 border border-gray-300 rounded-md" />
              </div>

              <div className="flex mb-6 -mx-2">
                <div className="w-1/2 px-2">
                  <label className="block mb-2 text-sm text-gray-600">
                    Expiry Date
                  </label>
                  <CardExpiryElement className="p-3 border border-gray-300 rounded-md" />
                </div>
                <div className="w-1/2 px-2">
                  <label className="block mb-2 text-sm text-gray-600">
                    CVC
                  </label>
                  <CardCvcElement className="p-3 border border-gray-300 rounded-md" />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                </div>
                {inputErrors.userState && (
                  <p className="error-message">{inputErrors.userState}</p>
                )}
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
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
