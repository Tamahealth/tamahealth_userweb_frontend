import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";
import { UsaStates } from "usa-states";
import { validatePage3Form } from "./form-utils/validations";

const PatientAndUpload3 = () => {
  const { formData, updateFormData, error, loadUserInfo, userInfo } =
    useContext(PrescriptionFormContext);

  const navigate = useNavigate();
  const usStates = new UsaStates();
  const [inputError, setInputError] = useState({});

  useEffect(() => {
    // Check if userInfo has been loaded
    if (!userInfo && formData.userId) {
      loadUserInfo(formData.userId);
    }
  }, [formData.userId, userInfo, loadUserInfo]);

  if (error) {
    // Render error state
    return <div>Error loading user information: {error.message}</div>;
  }

  // Ensure userInfo fields are set to prevent uncontrolled/controlled warning
  const initialUserInfo = {
    AccountHolderFirstName: userInfo?.AccountHolderFirstName || "",
    AccountHolderLastName: userInfo?.AccountHolderLastName || "",
    AccountHolderEmail: userInfo?.AccountHolderEmail || "",
    AccountHolderPhone: userInfo?.AccountHolderPhone || "",
  };

  // If userInfo is null or undefined, you can render a loading state or nothing
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleNextClick = () => {
    const validationErrors = validatePage3Form(formData);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/prescription/review-and-submit");
    } else {
      setInputError(validationErrors);
    }
  };

  const handleBackClick = () => {
    navigate("/prescription/patient-and-upload-2");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h1 className="text-blue-800 text-2xl mb-4">
            PATIENT & PRESCRIPTION
          </h1>
          <h2 className="text-gray-700 text-lg">
            Prescription Refill Representative
          </h2>
          <p className="text-gray-600 text-sm">
            Please note that the account owner is listed as the prescription and
            medicine order representative. The following details are assumed to
            be of the representative and cannot be edited here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* First Name */}
          <div className="mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={initialUserInfo.AccountHolderFirstName}
              readOnly
            />
          </div>
          {/* Last Name */}
          <div className="mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={initialUserInfo.AccountHolderLastName}
              readOnly
            />
          </div>
          {/* Phone */}
          <div className="mb-6 md:mb-0 lg:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={initialUserInfo.AccountHolderPhone}
              readOnly
            />
          </div>

          {/* Email */}
          <div className="mb-6 lg:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={initialUserInfo.AccountHolderEmail}
              readOnly
            />
          </div>

          {/* Street Address */}
          <div className="mb-6 lg:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Street Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="AccountHolderAddress"
              value={formData.AccountHolderAddress}
              onChange={handleChange}
              required
            />
            {inputError.AccountHolderAddress && (
              <p className="text-red-500 text-xs italic">
                {inputError.AccountHolderAddress}
              </p>
            )}
          </div>

          {/* State Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="AccountHolderState"
              value={formData.AccountHolderState}
              onChange={handleChange}
              required
            >
              <option disabled={true} value="">
                Select a state
              </option>
              {usStates.states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
            {inputError.AccountHolderState && (
              <p className="text-red-500 text-xs italic">
                {inputError.AccountHolderState}
              </p>
            )}
          </div>

          {/* City */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="AccountHolderCity"
              value={formData.AccountHolderCity}
              onChange={handleChange}
              required
            />
            {inputError.AccountHolderCity && (
              <p className="text-red-500 text-xs italic">
                {inputError.AccountHolderCity}
              </p>
            )}
          </div>

          {/* ZIP Code */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ZIP Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="AccountHolderZipCode"
              value={formData.AccountHolderZipCode}
              onChange={handleChange}
              required
            />
            {inputError.AccountHolderZipCode && (
              <p className="text-red-500 text-xs italic">
                {inputError.AccountHolderZipCode}
              </p>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Make sure to carefully fill out your address information. Incorrect
          details may delay your order.
        </p>

        <div className="mb-6 flex flex-col md:flex-row justify-between w-full">
          {/* Back Button */}
          <div className="mb-4 md:mb-0">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
              type="button"
              onClick={handleBackClick}
            >
              Back to Page Two
            </button>
          </div>
          {/* Next Button */}
          <div>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
              type="button"
              onClick={handleNextClick}
            >
              Review to Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAndUpload3;
