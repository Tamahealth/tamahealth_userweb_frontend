import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext"; // Replace with the actual context import if different

const NotesAndReview = () => {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { formData } = useContext(PrescriptionFormContext);

  const handleEdit = () => {
    navigate("/prescription/patient-and-upload-1");
  };
  const handleNotesChange = (e) => {
    if (e.target.value.length <= 500) {
      setNotes(e.target.value);
    }
  };
  console.log(formData);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Review and Confirm</h2>

          {/* Review the form data */}
          <div className="mb-4">
            <p>
              <strong>Full Name:</strong> {formData.firstName}{" "}
              {formData.lastName}
            </p>
            <p>
              <strong>Birth Date:</strong> {formData.birthDate}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </p>
            <p>
              <strong></strong>
            </p>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>

          <div className="mt-4">
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

          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                /* Logic to proceed to the next step */
              }}
            >
              Confirm and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesAndReview;
