import React from "react";
import NextButton from "./PrescriptionFormNext.jsx";

export default function PatientAndUpload3({ formData, handleInputChange }) {
  return (
    <div className="container">
      <h1 className="text">PATIENT & PRESCRIPTION</h1>
      <h2 className="texts">Prescription Refill Representative</h2>
      <div className="form-row">
        {/* Commissary Name (Last) */}
        <div className="input-data">
          <input
            type="text"
            name="CommissaryNameLast"
            value={formData.CommissaryNameLast}
            onChange={handleInputChange}
            autoComplete="given-name"
            required
          />
          <div className="underline"></div>
          <label>Commissary Name: (Last)</label>
        </div>
        {/* First Name */}
        <div className="input-data">
          <input
            type="text"
            name="CommissaryNameFirst"
            value={formData.CommissaryNameFirst}
            onChange={handleInputChange}
            autoComplete="family-name"
            required
          />
          <div className="underline"></div>
          <label>First</label>
        </div>
        {/* Middle Name */}
        <div className="input-data">
          <input
            type="text"
            name="CommissaryNameMiddle"
            value={formData.CommissaryNameMiddle}
            onChange={handleInputChange}
            autoComplete="family-name"
            required
          />
          <div className="underline"></div>
          <label>Middle</label>
        </div>
      </div>
      <div className="form-row">
        {/* Address */}
        <div className="input-data">
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>Address</label>
        </div>
        {/* City */}
        <div className="input-data">
          <input
            type="text"
            name="city2"
            value={formData.city2}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>City</label>
        </div>
      </div>
      <div className="form-row">
        {/* State */}
        <div className="input-data">
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>State</label>
        </div>
        {/* Zip Code */}
        <div className="input-data">
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>Zip Code</label>
        </div>
      </div>
      <div className="form-row">
        {/* Phone Number */}
        <div className="input-data">
          <input
            type="phone"
            id="phone2"
            name="phone2"
            value={formData.phone2}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>Phone Number</label>
        </div>
        {/* Email */}
        <div className="input-data">
          <input
            type="email"
            id="email2"
            name="email2"
            value={formData.email2}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>Email</label>
        </div>
      </div>
      <div className="form-row">
        {/* Diagnosis */}
        <div className="input-data textarea">
          <textarea
            rows="8"
            cols="80"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleInputChange}
            required
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="">Diagnosis</label>
        </div>
      </div>
      <div className="form-row">
        {/* Patient Message */}
        <div className="input-data textarea">
          <textarea
            rows="8"
            cols="80"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="">Patient Message</label>
        </div>
      </div>
      <div className="space-y-4">
        <NextButton onClick={handleNextClick} />
      </div>
    </div>
  );
}
