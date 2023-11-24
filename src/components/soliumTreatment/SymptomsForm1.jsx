// Import useContext from React and our context
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoliumFormContext } from "./SoliumFormContext";
// import { validatePage1From } from "./form-utils/validations";

const SymptomsForm1 = () => {
  const { formData, updateFormData } = useContext(SoliumFormContext);
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({});

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    updateFormData({ [e.target.name]: value });
  };

  const handleNextClick = () => {
    // const validationErrors = validatePage1From(formData);
    // if (Object.keys(validationErrors).length === 0) {
    navigate("/solium/symptoms-form-2");
    // } else {
    //   setInputError(validationErrors);
    // }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">
          Start free remote checkup!          </h2>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            What is your age? <span className="text-red-500">*</span>
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

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="sex"
          >
            What is your sex? <span className="text-red-500">*</span>
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

        {/* Add Female-specific questions */}
        {formData.PatientSex === "Female" && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Are you pregnant currently?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex flex-wrap">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="IsPregnant"
                  value="Yes"
                  onChange={handleChange}
                  checked={formData.IsPregnant === "Yes"}
                  required
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="IsPregnant"
                  value="No"
                  onChange={handleChange}
                  checked={formData.IsPregnant === "No"}
                  required
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        )}

        {formData.PatientSex === "Female" && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Are you breastfeeding currently?
            </label>
            <div className="mt-2 flex flex-wrap">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="IsBreastfeeding"
                  value="Yes"
                  onChange={handleChange}
                  checked={formData.IsBreastfeeding === "Yes"}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="IsBreastfeeding"
                  value="No"
                  onChange={handleChange}
                  checked={formData.IsBreastfeeding === "No"}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            Which state are you residing in?
          </label>
          <select
            className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
            id="state"
            name="PatientState"
            value={formData.PatientState || ""}
            onChange={handleChange}
          >
            <option value="">Select your state</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            {/* Add more states as needed */}
          </select>
        </div>

        

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
  );
};

export default SymptomsForm1;
