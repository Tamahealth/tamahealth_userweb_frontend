// Import useContext from React and our context
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";
import { validatePage1From } from "./form-utils/validations";
import SVGCarLoader from "../Loading/SVGCarLoader";

const PatientAndUpload1 = () => {
  const { formData, updateFormData } = useContext(PrescriptionFormContext);
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <SVGCarLoader />
      </div>
    );
  }

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    updateFormData({ [e.target.name]: value });
  };

  const handleNextClick = () => {
    const validationErrors = validatePage1From(formData);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/prescription/patient-and-upload-2");
    } else {
      setInputError(validationErrors);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-500 font-semibold text-3xl mb-4">
            Patient Details
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Please enter the details for the patient whose name is on the
            prescription file.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
          {/* First Name */}
          <div className="mb-6 md:mb-0">
            <label
              htmlFor="first-name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="text"
              id="first-name"
              placeholder="First Name"
              name="PatientFirstName"
              value={formData.PatientFirstName || ""}
              onChange={handleChange}
              required
            />
            {inputError.PatientFirstName && (
              <p className="text-red-500 text-xs italic">
                {inputError.PatientFirstName}
              </p>
            )}
          </div>
          {/* Last Name */}
          <div className="mb-6 md:mb-0">
            <label
              htmlFor="last-name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="text"
              id="last-name"
              placeholder="Last Name"
              name="PatientLastName"
              value={formData.PatientLastName || ""}
              onChange={handleChange}
              required
            />
            {inputError.PatientLastName && (
              <p className="text-red-500 text-xs italic">
                {inputError.PatientLastName}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="mb-6 md:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthdate"
            >
              Birthdate (optional)
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="date"
              id="birthdate"
              placeholder="mm/dd/yyyy"
              name="PatientBirthDate"
              value={formData.PatientBirthDate || ""}
              onChange={handleChange}
            />
            {inputError.PatientBirthDate && (
              <p className="text-red-500 text-xs italic">
                {inputError.PatientBirthDate}
              </p>
            )}
          </div>
          <div className="mb-6 md:mb-0 md:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="number"
              id="age"
              placeholder="Age"
              name="PatientAge"
              value={formData.PatientAge || ""}
              onChange={handleChange}
              required
            />
            {inputError.PatientAge && (
              <p className="text-red-500 text-xs italic">
                {inputError.PatientAge}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="mb-6 md:mb-0 md:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sex"
              >
                Sex
              </label>
              <div className="mt-2 flex flex-wrap">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="PatientSex"
                    value="Male"
                    onChange={handleChange}
                    checked={formData.PatientSex === "Male"}
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="PatientSex"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.PatientSex === "Female"}
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
                {inputError.PatientSex && (
                  <p className="text-red-500 text-xs italic">
                    {inputError.PatientSex}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Patient Address */}
          <div className="mb-6 md:mb-0 md:col-span-1">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Patient Address
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="address"
              placeholder="Street Address"
              name="PatientAddress"
              value={formData.PatientAddress || ""}
              onChange={handleChange}
            />
            {inputError.PatientAddress && (
              <p className="text-red-500 text-xs italic">
                {inputError.PatientAddress}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="mb-6 lg:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
                type="text"
                id="city"
                placeholder="City"
                name="PatientCity"
                value={formData.PatientCity || ""}
                onChange={handleChange}
              />
              {inputError.PatientCity && (
                <p className="text-red-500 text-xs italic">
                  {inputError.PatientCity}
                </p>
              )}
            </div>

            <div className="flex-1 max-w-md">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
                type="text"
                id="country"
                placeholder="Country"
                name="PatientCountry"
                value={formData.PatientCountry || ""}
                onChange={handleChange}
              />
              {inputError.PatientCountry && (
                <p className="text-red-500 text-xs italic">
                  {inputError.PatientCountry}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-6">
          {/* Cellular input */}
          <div className="mb-6">
            <label
              htmlFor="cellular"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cellular
            </label>
            <div className="flex space-x-3">
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
                type="tel"
                id="cellular"
                placeholder="+1234567890"
                name="PatientCellular"
                value={formData.PatientCellular || ""}
                onChange={handleChange}
                pattern="\+[0-9]{1,15}"
              />
              {inputError.PatientCellular && (
                <p className="text-red-500 text-xs italic">
                  {inputError.PatientCellular}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleNextClick}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAndUpload1;
