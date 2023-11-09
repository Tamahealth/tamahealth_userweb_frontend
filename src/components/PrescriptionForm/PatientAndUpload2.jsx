import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";

const PatientAndUpload2 = () => {
  const { formData, updateFormData } = useContext(PrescriptionFormContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    updateFormData({ [name]: type === "file" ? files[0] : value });
  };

  const handleNextClick = () => {
    navigate("/prescription/patient-and-upload-3");
  };
  const handleBackClick = () => {
    navigate("/prescription/patient-and-upload-1");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">
            ORIGINAL PRESCRIPTION INFORMATION
          </h2>
        </div>

        {/* Prescriber Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Prescriber */}
          <div className="mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prescriber
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="prescriber"
              value={formData.prescriber}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          {/* Occupation */}
          <div className="mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Occupation
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
        </div>

        {/* Institution Phone Number and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Prescriber Institution */}
          <div className="md:col-span-1 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prescriber Institution
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="prescriberInstitution"
              value={formData.prescriberInstitution}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          {/* Phone Number and Email */}
          <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* File Uploader */}
        <div className="mb-6 md:max-w-lg">
          <label
            htmlFor="prescriptionFile"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Prescription
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prescriptionFile"
            type="file"
            name="prescriptionFile"
            onChange={handleChange}
          />
          <p className="text-gray-600 text-xs mt-2">
            Accepted formats: .pdf, .jpg, .png (Max size: 5MB)
          </p>
        </div>
        <div className="mb-6 flex flex-col md:flex-row justify-between w-full">
          {/* Back Button */}
          <div className="mb-4 md:mb-0">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full md:w-auto"
              type="button"
              onClick={handleBackClick}
            >
              Back to Page One
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

export default PatientAndUpload2;
