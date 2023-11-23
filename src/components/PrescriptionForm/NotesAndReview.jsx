import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";

const NotesAndReview = () => {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { formData, userInfo } = useContext(PrescriptionFormContext);

  const handleEdit = () => {
    navigate("/prescription/patient-and-upload-1");
  };

  const handleNotesChange = (e) => {
    if (e.target.value.length <= 500) {
      setNotes(e.target.value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">Review and Confirm</h2>
        </div>
        {/* Patient Information */}
        <div className="mb-6 border-b-2 pb-4">
          <h3 className="text-blue-800 text-2xl mb-4">Patient Information</h3>
          <p className="mb-2">
            <strong>Patient's Full Name:</strong> {formData.PatientFirstName}{" "}
            {formData.PatientLastName}
          </p>
          <p className="mb-2">
            <strong>Patient's Birth Date:</strong> {formData.PatientBirthDate}
          </p>
          <p className="mb-2">
            <strong>Patient's Age: </strong> {formData.PatientAge}
          </p>
          <p className="mb-2">
            <strong>Patient's Sex: </strong> {formData.PatientSex}
          </p>
          <p className="mb-2">
            <strong>Patient's Address:</strong> {formData.PatientAddress}
          </p>
          <p className="mb-2">
            <strong>Patient's Phone Number:</strong> {formData.PatientCellular}
          </p>
        </div>

        {/* Prescription Details */}
        <div className="mb-6 border-b-2 pb-4">
          <h3 className="text-blue-800 text-2xl mb-4">Prescription Details</h3>
          <p className="mb-2">
            <strong>Prescriber Full Name:</strong> {formData.PrescriberFullName}
          </p>
          <p className="mb-2">
            <strong>Prescriber Occupation:</strong>{" "}
            {formData.PrescriberOccupation}
          </p>
          <p className="mb-2">
            <strong>Prescriber Institution:</strong>{" "}
            {formData.PrescriberInstitution}
          </p>
          <p className="mb-2">
            <strong>Prescriber Phone Number:</strong> {formData.PrescriberPhone}
          </p>

          <p className="mb-2">
            <strong>Prescriber Email:</strong> {formData.PrescriberEmail}
          </p>
        </div>

        {/* Prescription Representative */}
        <div className="mb-6 border-b-2 pb-4">
          <h3 className="text-blue-800 text-2xl mb-4">
            Prescription Representative
          </h3>
          <p className="mb-2">
            <strong>Representative Full Name:</strong>{" "}
            {userInfo.AccountHolderFirstName} {userInfo.AccountHolderLastName}
          </p>
          <p className="mb-2">
            <strong>Representative Phone Number:</strong>{" "}
            {userInfo.AccountHolderPhone}
          </p>
          <p className="mb-2">
            <strong>Representative Email:</strong> {userInfo.AccountHolderEmail}
          </p>
          <p className="mb-2">
            <strong>Representative Phone:</strong>
            {" +"} {userInfo.AccountHolderPhone}
          </p>
          <p className="mb-2">
            <strong>Representative Address:</strong>{" "}
            {formData.AccountHolderAddress}
          </p>
          <p className="mb-2">
            <strong>Account Holder State:</strong> {formData.AccountHolderState}
          </p>
          <p className="mb-2">
            <strong>Account Holder City:</strong> {formData.AccountHolderCity}
          </p>
          <p className="mb-2">
            <strong>Account Holder Zip Code: </strong>{" "}
            {formData.AccountHolderZipCode}
          </p>
          <p className="mb-2">
            <strong>Account Holder Country:</strong> {" United States"}
          </p>
        </div>

        {/* Additional Notes */}
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Additional Notes (optional):
          </label>
          <textarea
            id="notes"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            placeholder="Enter additional notes here (max 500 characters)"
            value={notes}
            onChange={handleNotesChange}
          />
          <p className="text-gray-600 text-xs italic">
            {notes.length}/500 characters
          </p>
        </div>

        {/* Edit and Confirm Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate("/prescription/payment/1");
            }}
          >
            Confirm and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesAndReview;
