import React, { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import NextButton from "./PrescriptionFormNext.jsx";
import "./prescription.css";

export default function PatientAndUpload() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentContainer, setCurrentContainer] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // New state to track overall form validity

  // Initialize formData from local storage if available, otherwise use default values
  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    prescriber: "",
    occupation: "",
    prescriberinstitution: "",
    phone1: "",
    email: "",
    CommissaryNameLast: "",
    CommissaryNameFirst: "",
    CommissaryNameMiddle: "",
    address2: "",
    city2: "",
    state: "",
    zip: "",
    phone2: "",
    email2: "",
    diagnosis: "",
    message: "",
    // uploads: [],
    // prescriptionFile: null,
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

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    const enteredAge = parseInt(formData.age, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(enteredAge) || enteredAge < 0 || enteredAge >= 150) {
      errors.age = "Age must be a valid number";
    }

    const enteredBirthYear = currentYear - enteredAge;
    if (enteredBirthYear > currentYear) {
      errors.age = "Age cannot be in the future";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleNextClick = () => {
    if (currentContainer === 1) {
      validateForm(); // Validate the form on button click
      if (isFormValid) {
        setCurrentContainer(currentContainer + 1);
      }
    }
  };
  

  return (
    <>
       {/* {currentContainer == 1 && ( */}
      <div className="container">
        <h1 className="text">PATIENT & PRESCRIPTION</h1>
        <h2 className="texts">Patient Info</h2>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              autoComplete="given-name"
              required
            />
            <InformationCircleIcon
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="h-5 w-5 text-blue-500 cursor-pointer ml-2"
            />
            {showTooltip && (
              <div className="absolute text-xs rounded bg-gray-700 text-white p-1">
                Enter the patient's name, not the account holder's.
              </div>
            )}
            {formErrors.firstName && (
            <div className="error">{formErrors.firstName}</div>
          )}
            <div className="underline"></div>
            <label>First Name</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              autoComplete="family-name"
              required
            />
            {formErrors.firstName && (
            <div className="error">{formErrors.firstName}</div>
          )}
            <div className="underline"></div>
            <label>Last Name</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <div className="underline"></div>
            <label>Birthdate</label>
          </div>
          <div className="input-data">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
                      {formErrors.age && <div className="error">{formErrors.age}</div>}

            <div className="underline"></div>
            <label>Age</label>
          </div>
          <div className="input-datas">
            <label>Sex:</label>
          </div>
          <div className="input-datas">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              <span className="design"></span>
              <span className="value">Male</span>
            </label>
          </div>
          <div className="input-datas">
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              <span className="design"></span>
              <span className="value">Female</span>
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <div className="underline"></div>
            <label>Patient Address</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <div className="underline"></div>
            <label>City</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
            <div className="underline"></div>
            <label>Country</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <div className="underline"></div>
            <label>Cellular</label>
          </div>
        </div>
        <div className="space-y-4">
          <NextButton  onClick={handleNextClick} />
        </div>
      </div>
      //  )};
      {/* second form */}
      {/* {currentContainer == 2 && ( */}
      <div className="container">
  <h1 className="text">PATIENT & PRESCRIPTION</h1>
  <h2 className="texts">Original Prescription Information</h2>
  <div className="form-row">
    <div className="input-data">
      <input
        type="text"
        name="prescriber"
        value={formData.prescriber}
        onChange={handleInputChange}
        autoComplete="given-name"
        required // Add this attribute to make the input required
      />
      <div className="underline"></div>
      <label>Prescriber</label>
    </div>
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
    <NextButton  onClick={handleNextClick} />
  </div>
</div>
      // )};
      {/* Third form */}
      {/* {currentContainer === 3 && ( */}
      <div className="container">
        <h1 className="text">PATIENT & PRESCRIPTION</h1>

        {/* <div className="space-y-4"> */}
        <h2 className="texts">Prescription Refill Representative</h2>
        {/* <div className="space-y-2 relative"> */}
        <div className="form-row">
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
            <label>Phone NUmber</label>
          </div>
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
        {/* </div> */}
        <div className="space-y-4">
          {/* <h2 className="text-md md:text-lg font-medium">Prescription</h2>
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
        </div> */}

          {/* <NextButton isDisabled={!isFormFilled} to="/reviewPrescription" /> */}
        </div>
        {/* </div> */}
      </div>
      {/* )} */}
    </>
  );
}
