import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotesAndReview = ({ formData }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  return (
    <div className="notes-and-review-container p-4 md:p-8 space-y-4 bg-white rounded-md shadow-md w-full md:w-3/5 lg:w-1/3 mx-auto max-w-3xl mt-16 mb-16">
      {/* Review Section */}
      <div className="space-y-4">
        <h2 className="text-md md:text-lg font-medium">
          Review Your Information
        </h2>
        <div className="review-section bg-gray-100 p-4 rounded">
          <p>
            <strong>Patient Name:</strong> {formData?.firstName}{" "}
            {formData?.lastName}
          </p>
          <p>
            <strong>Age:</strong> {formData?.age}
          </p>
          {/* More form fields summary */}
        </div>
        <button
          className="mt-4 w-full md:w-auto px-8 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
          onClick={() => navigate("/prescription")}
        >
          Edit
        </button>
      </div>
      {/* Additional Notes */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-600">
          Additional Notes
          {/* Add a tooltip here */}
        </label>
        <textarea
          className="mt-1 p-2 w-full rounded-md border focus:ring focus:ring-opacity-50"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
      </div>
      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-8 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
          Submit
        </button>
      </div>
    </div>
  );
};

export default NotesAndReview;
