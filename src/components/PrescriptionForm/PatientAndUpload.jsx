import React, { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import NextButton from "./PrescriptionFormNext.jsx";

export default function PatientAndUpload() {
  const [showTooltip, setShowTooltip] = useState(false);

  // Initialize formData from local storage if available, otherwise use default values
  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    firstName: "",
    lastName: "",
    age: "",
    prescriptionFile: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Save to local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //temporary activation for the next button
  const isFormFilled = formData.firstName !== "";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      prescriptionFile: file,
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-4 bg-white rounded-md shadow-md w-full md:w-3/5 lg:w-1/3 mx-auto max-w-3xl mt-16 mb-16">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
        Patient & Prescription
      </h1>

      <div className="space-y-4">
        <h2 className="text-md md:text-lg font-medium">Patient Info</h2>

        <div className="space-y-2 relative">
          <label className="flex items-center text-sm font-medium text-gray-600">
            First Name
            <InformationCircleIcon
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="h-5 w-5 text-blue-500 cursor-pointer ml-2"
            />
          </label>
          {showTooltip && (
            <div className="absolute text-xs rounded bg-gray-700 text-white p-1">
              Enter the patient's name, not the account holder's.
            </div>
          )}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full rounded-md border focus:ring focus:ring-opacity-50"
            autoComplete="given-name"
          />

          <label className="block text-sm md:text-md">
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full rounded-md border focus:ring focus:ring-opacity-50"
              autoComplete="family-name"
            />
          </label>

          <label className="block text-sm font-medium text-gray-600">Age</label>
          <select className="mt-1 p-2 w-1/3 rounded-md border focus:ring focus:ring-opacity-50">
            <option value="">Select age range</option>
            <option value="0-17">0-17</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
            <option value="65+">65+</option>
          </select>
        </div>

        <div className="space-y-4">
          <h2 className="text-md md:text-lg font-medium">Prescription</h2>
          <label className="block text-sm md:text-md">
            Upload File
            <input
              type="file"
              name="prescriptionFile"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full rounded-md border focus:ring focus:ring-opacity-50"
            />
          </label>
          <div className="text-xs md:text-sm text-blue-500">
            Max file size: 5MB. Formats: .pdf, .jpg, .png
          </div>
          <NextButton isDisabled={!isFormFilled} to="/reviewPrescription" />
        </div>
      </div>
    </div>
  );
}
