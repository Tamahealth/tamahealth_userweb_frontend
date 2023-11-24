import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoliumFormContext } from "./SoliumFormContext";
// import { validatePage2From } from "./form-utils/validations";

const SymptomsForm3 = () => {
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
    // const validationErrors = validatePage2From(formData, uploadedFileInfo);
    // if (Object.keys(validationErrors).length === 0) {
      navigate("/solium/symptoms-form-4");
    // } else {
    //   setInputError(validationErrors);
    // }
  };

  const handleBackClick = () => {
    navigate("/solium/symptoms-form-2");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">
          Tenia Worm Observation         </h2>
        </div>
  
        {/* Tenia Worm Observation */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Have you observed the tenia worm or segment in your stool recently?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="TeniaWormObservation"
                value="Yes"
                onChange={handleChange}
                checked={formData.TeniaWormObservation === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="TeniaWormObservation"
                value="No"
                onChange={handleChange}
                checked={formData.TeniaWormObservation === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Raw or Not Well-Cooked Beef */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Have you eaten a raw or not well-cooked beef in the last six months?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="RawBeefConsumption"
                value="Yes"
                onChange={handleChange}
                checked={formData.RawBeefConsumption === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="RawBeefConsumption"
                value="No"
                onChange={handleChange}
                checked={formData.RawBeefConsumption === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Travel to Tape Worm Endemic Area */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you have recent travel to a tape worm endemic area or country?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="TravelToEndemicArea"
                value="Yes"
                onChange={handleChange}
                checked={formData.TravelToEndemicArea === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="TravelToEndemicArea"
                value="No"
                onChange={handleChange}
                checked={formData.TravelToEndemicArea === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Intestinal Obstruction */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you have history of intestinal obstruction?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="IntestinalObstructionHistory"
                value="Yes"
                onChange={handleChange}
                checked={formData.IntestinalObstructionHistory === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="IntestinalObstructionHistory"
                value="No"
                onChange={handleChange}
                checked={formData.IntestinalObstructionHistory === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Surgery on Intestines */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you have history of surgery on your intestines?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="IntestineSurgeryHistory"
                value="Yes"
                onChange={handleChange}
                checked={formData.IntestineSurgeryHistory === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="IntestineSurgeryHistory"
                value="No"
                onChange={handleChange}
                checked={formData.IntestineSurgeryHistory === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Kidney Related Disease */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you have a Kidney related disease?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="KidneyRelatedDisease"
                value="Yes"
                onChange={handleChange}
                checked={formData.KidneyRelatedDisease === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="KidneyRelatedDisease"
                value="No"
                onChange={handleChange}
                checked={formData.KidneyRelatedDisease === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Liver Problem */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you have problem with your liver?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="LiverProblem"
                value="Yes"
                onChange={handleChange}
                checked={formData.LiverProblem === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="LiverProblem"
                value="No"
                onChange={handleChange}
                checked={formData.LiverProblem === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* ... (Remaining code unchanged) */}
  
        <div className="mb-6 flex flex-col md:flex-row justify-between w-full">
          {/* Back Button */}
          <div className="mb-4 md:mb-0">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
              type="button"
              onClick={handleBackClick}
            >
              Back to Page two
            </button>
          </div>
          {/* Next Button */}
          <div>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
              type="button"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default SymptomsForm3;
