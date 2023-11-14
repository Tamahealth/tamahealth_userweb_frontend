import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";

const PatientAndUpload2 = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    formData,
    updateFormData,
    uploadFile,
    handleFileDeletion,
    setUploadedFileInfo,
    uploadedFileInfo,
    deletionSuccessMessage,
    deletionErrorMessage,
  } = useContext(PrescriptionFormContext);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          // Set error message for file size
          setErrorMessage("File size should be less than 5MB");
        } else if (
          !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
        ) {
          // Set error message for file type
          setErrorMessage("Only PDF, JPG, and PNG files are allowed");
        } else {
          setErrorMessage(""); // Clear any previous error messages
          try {
            const uploadResult = await uploadFile(e);
            console.log("upload result is", uploadResult);
            const { fileUrl, fileKey } = uploadResult;
            setUploadedFileInfo({ fileUrl, fileKey });
            updateFormData({ ...formData, prescriptionFile: fileUrl }); // Update form data with file URL
          } catch (uploadError) {
            // Set error message for upload failure
            setErrorMessage("File upload failed: " + uploadError.message);
          }
        }
        return; // Exit the function after handling file upload
      }
    } else {
      updateFormData({ [name]: e.target.value });
      setErrorMessage(""); // Clear any error messages for other inputs
    }
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
              name="PrescriberFullName"
              value={formData.PrescriberFullName}
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
              name="PrescriberOccupation"
              value={formData.PrescriberOccupation}
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
              name="PrescriberInstitution"
              value={formData.PrescriberInstitution}
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
                name="PrescriberPhone"
                value={formData.PrescriberPhone}
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
                name="PrescriberEmail"
                value={formData.PrescriberEmail}
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
            name="PrescriptionFile"
            onChange={handleChange}
            accept=".pdf, image/jpeg, image/png" // Restrict file types
          />
          {uploadedFileInfo.fileKey && (
            <div>
              <a
                href={uploadedFileInfo.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uploadedFileInfo.fileKey.split("/").pop()}{" "}
                {/* This will display the file name extracted from the key */}
              </a>
              <button onClick={handleFileDeletion}>Remove</button>
            </div>
          )}

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <p className="text-gray-600 text-xs mt-2">
            Accepted formats: .pdf, .jpg, .png (Max size: 5MB)
          </p>
          {deletionSuccessMessage && (
            <div className="text-green-500">{deletionSuccessMessage}</div>
          )}
          {deletionErrorMessage && (
            <div className="text-red-500">{deletionErrorMessage}</div>
          )}
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
