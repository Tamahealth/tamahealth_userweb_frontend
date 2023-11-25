import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";
import { validatePage2From } from "./form-utils/validations";
import SVGCarLoader from "../Loading/SVGCarLoader";
// import GlassHourLoading from "../Loading/glassHourLoading";
import { hatch } from "ldrs";

const PatientAndUpload2 = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [inputError, setInputError] = useState({});
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
  const [isUploading, setIsUploading] = useState(false);
  hatch.register();

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
          setIsUploading(true);
          setErrorMessage(""); // Clear any previous error messages
          try {
            const uploadResult = await uploadFile(e);
            // console.log("upload result is", uploadResult);
            const { fileUrl, fileKey } = uploadResult;
            setUploadedFileInfo({ fileUrl, fileKey });
            updateFormData({ ...formData, prescriptionFile: fileUrl }); // Update form data with file URL
          } catch (uploadError) {
            // Set error message for upload failure
            setErrorMessage("File upload failed: " + uploadError.message);
            setUploadError(uploadError.message);
          } finally {
            setIsUploading(false);
          }
        }
        return;
      }
    } else {
      updateFormData({ [name]: e.target.value });
      setErrorMessage("");
    }
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
      navigate("/prescription/patient-and-upload-3");
    } else {
      setInputError(validationErrors);
    }
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
            {inputError.PrescriberFullName && (
              <p className="text-red-500 text-xs italic">
                {inputError.PrescriberFullName}
              </p>
            )}
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
            {inputError.PrescriberOccupation && (
              <p className="text-red-500 text-xs italic">
                {inputError.PrescriberOccupation}
              </p>
            )}
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
            {inputError.PrescriberInstitution && (
              <p className="text-red-500 text-xs italic">
                {inputError.PrescriberInstitution}
              </p>
            )}
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
              {inputError.PrescriberPhone && (
                <p className="text-red-500 text-xs italic">
                  {inputError.PrescriberPhone}
                </p>
              )}
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
              {inputError.PrescriberEmail && (
                <p className="text-red-500 text-xs italic">
                  {inputError.PrescriberEmail}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* File Uploader */}
        <div className="mb-6 md:max-w-lg">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Prescription
          </label>
          {uploadedFileInfo.fileKey ? (
            <>
              <div className="file-name-display">
                <a
                  href={uploadedFileInfo.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {extractFileName(uploadedFileInfo.fileKey)}
                </a>
                <button
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleFileDeletion}
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            <>
              <label
                htmlFor="prescriptionFile"
                className="custom-file-upload py-2 px-4 border border-gray-300 rounded cursor-pointer"
              >
                Choose File
              </label>
              <input
                id="prescriptionFile"
                type="file"
                name="PrescriptionFile"
                onChange={handleChange}
                accept=".pdf, image/jpeg, image/png"
                style={{ display: "none" }}
                required
              />
              {inputError.fileUpload && (
                <p className="text-red-500 text-xs italic">
                  {inputError.fileUpload}
                </p>
              )}
              {uploadError && <div className="text-red-500">{uploadError}</div>}
            </>
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
            {isUploading && (
              <div className="loader-wrapper">
                <SVGCarLoader />
                {/* Optional: Add a loading message */}
                <p className="loading-text">Uploading, please wait...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAndUpload2;
