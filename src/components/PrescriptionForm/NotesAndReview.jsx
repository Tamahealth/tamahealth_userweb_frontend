import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./prescription.css";

const NotesAndReview = ({ formData }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Review Section */}
      <div className="space-y-4">
        <h2 className="text">Review Your Information</h2>
        <h2 className="texts">PATIENT INFO</h2>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Patient Name: </strong> {formData?.firstName}{" "}
              {formData?.lastName}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Birthdate: </strong> {formData?.date}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Age: </strong> {formData?.age}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Sex: </strong> {formData?.gender}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Address: </strong> {formData?.address}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>City: </strong> {formData?.city}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Country: </strong> {formData?.country}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Phone Number: </strong> {formData?.phone}
            </p>
          </div>

          <div className="input-data"></div>
        </div>
        <h2 className="texts">ORIGINAL PRESCRIPTION INFORMATION</h2>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Prescriber: </strong> {formData?.prescriber}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Occupation: </strong> {formData?.occupation}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Prescriber Institution: </strong>{" "}
              {formData?.prescriberinstitution}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Phone NUmber: </strong> {formData?.phone1}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Email: </strong> {formData?.email}
            </p>
          </div>
          <div className="input-data">  </div>
          </div>
        <h2 className="texts">PRESCRIPTION REFILL REPRESENTATIVE</h2>

        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Commissary Full Name: </strong>
              {formData?.CommissaryNameFirst} 
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Commissary Full Name: </strong>
               {formData?.CommissaryNameMiddle}{" "}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Commissary Full Name: </strong>
              {formData?.CommissaryNameLast}
            </p>
          </div>
          
        </div>
        <div className="form-row">
        <div className="input-data">
            <p>
              <strong>Address: </strong> {formData?.address2}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>City: </strong> {formData?.city2}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>State: </strong> {formData?.state}
            </p>
          </div>
          
        </div>
        <div className="form-row">
        <div className="input-data">
            <p>
              <strong>Zip Code: </strong> {formData?.zip}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Phone: </strong> {formData?.phone2}
            </p>
          </div>
          <div className="input-data">
            <p>
              <strong>Email: </strong> {formData?.email2}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Diagnosis: </strong> {formData?.diagnosis}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <p>
              <strong>Message: </strong> {formData?.message}
            </p>
          </div>
          {/* Display more form fields summary */}
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
          Next
        </button>
      </div>
    </div>
  );
};

export default NotesAndReview;
