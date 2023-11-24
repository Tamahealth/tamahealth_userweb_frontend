import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoliumFormContext } from "./SoliumFormContext";
// import { validatePage2From } from "./form-utils/validations";

const SymptomsForm4 = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState({});
  const {
    formData,
    updateFormData,
    deletionSuccessMessage,
    deletionErrorMessage,
  } = useContext(SoliumFormContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const extractFileName = (fileKey) => {
    const [, uuidAndFilename] = fileKey.split("/");
    const uuidLength = 36;
    const filename = uuidAndFilename.substring(uuidLength + 1);
    return filename;
  };

  const handleNextClick = () => {
    const validationErrors = validatePage2From(formData, uploadedFileInfo);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/solium/symptoms-form-4");
    } else {
      setInputError(validationErrors);
    }
  };

  const handleBackClick = () => {
    navigate("/solium/symptoms-form-2");
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
  
    // Handle unchecking of checkboxes
    if (!checked) {
      setFormData((prevData) => ({ ...prevData, [name]: false }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">
          Tenia Medication Agreement         </h2>
        </div>
  
        {/* ... (Previous Code) */}
  
        {/* Additional Input Fields */}
        {/* Tenia Medication Agreement */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          You are close to checking out your visitation. Please read the statement below
        </label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              name="TeniaMedicationAgreement"
              onChange={handleCheckboxChange}
              checked={formData.TeniaMedicationAgreement}
              required
            />
            <span className="ml-2">
              The treatment is solely for you
            </span>
          </label>
        </div>
      </div>

      {/* Treatment Instructions */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Treatment suggestion
        </label>
        <p className="mb-2">
          Albendazole
        </p>
      </div>

      {/* Agreement and Alternative Treatment */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          I agree
        </label>
        <div className="mt-2 flex flex-wrap">
          <label className="inline-flex items-center mr-6">
            <input
              type="checkbox"
              className="form-checkbox"
              name="Agree"
              onChange={handleCheckboxChange}
              checked={formData.Agree}
              required
            />
            <span className="ml-2">I agree</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              name="WantAlternativeTreatment"
              onChange={handleCheckboxChange}
              checked={formData.WantAlternativeTreatment}
            />
            <span className="ml-2">Want alternative treatment</span>
          </label>
        </div>
      </div>

      {/* Alternative Treatment Instructions */}
      {formData.WantAlternativeTreatment && (
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Treatment Suggestion
          </label>
          <p className="mb-2">
            Praziquantel
          </p>
        </div>
      )}

      {/* Next Step Button */}
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
            className={`${
              formData.Agree ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            } text-white font-semibold py-2 px-4 rounded w-full md:w-auto`}
            type="button"
            onClick={handleNextClick}
            disabled={!formData.Agree}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default SymptomsForm4;
