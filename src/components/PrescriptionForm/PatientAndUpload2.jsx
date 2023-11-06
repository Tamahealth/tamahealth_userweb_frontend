import React from "react";
import NextButton from "./PrescriptionFormNext.jsx";
import { useNavigate } from "react-router-dom";

const handleNextClick = () => {
  navigate("/prescriptionform/patientandupload3");
};

// Meraye here either you can use the props to pass the formData and handleInputChange function or
// you can use the useContext hook to access the formData and handleInputChange function
// from the PrescriptionFormContainer component

export default function PatientAndUpload2({ formData, handleInputChange }) {
  return (
    <div className="container">
      <h1 className="text">PATIENT & PRESCRIPTION</h1>
      <h2 className="texts">Original Prescription Information</h2>
      <div className="form-row">
        {/* Prescriber */}
        <div className="input-data">
          <input
            type="text"
            name="prescriber"
            value={formData?.prescriber}
            onChange={handleInputChange}
            autoComplete="given-name"
            required
          />
          <div className="underline"></div>
          <label>Prescriber</label>
        </div>

        {/* Occupation */}
        <div className="input-data">
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            autoComplete="family-name"
            required // Add this attribute to make the input required
          />
          <div className="underline"></div>
          <label>Occupation</label>
        </div>
      </div>
      <div className="form-row">
        {/* Prescriber Institution */}
        <div className="input-data">
          <input
            type="text"
            name="prescriberinstitution" // Ensure the name attribute matches
            value={formData.prescriberinstitution}
            onChange={handleInputChange}
            required // Add this attribute to make the input required
          />
          <div className="underline"></div>
          <label>Prescriber Institution</label>
        </div>
        {/* Phone Number */}
        <div className="input-data">
          <input
            type="tel" // Change the type to tel for phone numbers
            name="phone1"
            value={formData.phone1}
            onChange={handleInputChange}
            required // Add this attribute to make the input required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Add this attribute to specify a valid phone number format
          />
          <div className="underline"></div>
          <label>Phone Number</label>
        </div>
        {/* Email */}
        <div className="input-data">
          <input
            type="email" // Change the type to email for email addresses
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required // Add this attribute to make the input required
          />
          <div className="underline"></div>
          <label>Email</label>
        </div>
      </div>
      <div className="space-y-4">
        <NextButton onClick={handleNextClick} />
      </div>
    </div>
  );
}
