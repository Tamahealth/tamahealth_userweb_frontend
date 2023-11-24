import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoliumFormContext } from "./SoliumFormContext";
import { UsaStates } from "usa-states";
// import { validatePage3Form } from "./form-utils/validations";

const SymptomsForm2 = () => {
  const { formData, updateFormData, error, loadUserInfo, userInfo } =
    useContext(SoliumFormContext);

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

  // If userInfo is null or undefined, you can render a loading state or nothing
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleNextClick = () => {
    // const validationErrors = validatePage3Form(formData);
    // if (Object.keys(validationErrors).length === 0) {
      navigate("/solium/symptoms-form-3");
    // } else {
    //   setInputError(validationErrors);
    // }
  };

  const handleBackClick = () => {
    navigate("/solium/symptoms-form-1");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          
          <h2 className="text-blue-800 text-2xl mb-4">
          Wellness Clinic Visit        </h2>
          
        </div>
  
        {/* Wellness Clinic Visit */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Have you had a wellness clinic visit with any doctor or health care provider in the last three years?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="WellnessClinicVisit"
                value="Yes"
                onChange={handleChange}
                checked={formData.WellnessClinicVisit === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="WellnessClinicVisit"
                value="No"
                onChange={handleChange}
                checked={formData.WellnessClinicVisit === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Tapeworm Treatment */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Have you had taken any tapeworm treatment in the past?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="TapewormTreatment"
                value="Yes"
                onChange={handleChange}
                checked={formData.TapewormTreatment === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="TapewormTreatment"
                value="No"
                onChange={handleChange}
                checked={formData.TapewormTreatment === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Medication Name in the Past */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Please let us know if you know the name of the medication you took in the past
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            placeholder="Write the name of the medication if known, otherwise NA"
            name="PastMedicationName"
            value={formData.PastMedicationName}
            onChange={handleChange}
          />
        </div>
  
        {/* Known Allergy or Adverse Reaction */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you have any known allergy or adverse reaction to medications?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="KnownAllergy"
                value="Yes"
                onChange={handleChange}
                checked={formData.KnownAllergy === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="KnownAllergy"
                value="No"
                onChange={handleChange}
                checked={formData.KnownAllergy === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Medications Allergic To */}
        {formData.KnownAllergy === "Yes" && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Please list down the medications to which you are allergic
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="1. Enter medication name"
              name="MedicationsAllergicTo"
              value={formData.MedicationsAllergicTo}
              onChange={handleChange}
            />
          </div>
        )}
  
        {/* Currently Taking Medication */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you take any prescription or over-the-counter medication currently?
          </label>
          <div className="mt-2 flex flex-wrap">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="TakingMedicationCurrently"
                value="Yes"
                onChange={handleChange}
                checked={formData.TakingMedicationCurrently === "Yes"}
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="TakingMedicationCurrently"
                value="No"
                onChange={handleChange}
                checked={formData.TakingMedicationCurrently === "No"}
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
  
        {/* Medications Currently Taking */}
        {formData.TakingMedicationCurrently === "Yes" && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Please name all the medication you are currently taking
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Enter medication names"
              name="MedicationsCurrentlyTaking"
              value={formData.MedicationsCurrentlyTaking}
              onChange={handleChange}
            />
          </div>
        )}
  
        {/* ... (Remaining code unchanged) */}
  
        <div className="mb-6 flex flex-col md:flex-row justify-between w-full">
          {/* Back Button */}
          <div className="mb-4 md:mb-0">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
              type="button"
              onClick={handleBackClick}
            >
              Back to Page one
            </button>
          </div>
          {/* Next Button */}
          <div className="md:self-end">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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

export default SymptomsForm2;
