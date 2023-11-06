// PrescriptionForm/PrescriptionFormContainer.jsx

import React, { useState } from "react";
import PatientAndUpload from "./PatientAndUpload";
import PatientAndUpload1 from "./PatientAndUpload1";
import PatientAndUpload2 from "./PatientAndUpload2";
import PatientAndUpload3 from "./PatientAndUpload3";
import NotesAndReview from "./NotesAndReview";
import ProgressBar from "./ProgressBar";

const PrescriptionFormContainer = () => {
  const [isFormComplete, setIsFormComplete] = useState(false); // This state will be set based on form validation logic later
  const [formData, setFormData] = useState({}); // Initialize formData

  const goToReviewAndSubmit = () => {
    // Code to navigate to the 'Review and Submit' component
  };
  const handleFormSubmit = () => {
    // Access the form input values and construct the formData object
    const formDataFromInputs = {
      firstName: document.querySelector('input[name="firstName"]').value,
      lastName: document.querySelector('input[name="lastName"]').value,
      date: document.querySelector('input[name="date"]').value,
      age: document.querySelector('input[name="age"]').value,
      gender: document.querySelector('input[name="gender"]').value,
      address: document.querySelector('input[name="address"]').value,
      city: document.querySelector('input[name="city"]').value,
      country: document.querySelector('input[name="country"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      prescriber: document.querySelector('input[name="prescriber"]').value,
      occupation: document.querySelector('input[name="occupation"]').value,
      prescriberinstitution: document.querySelector(
        'input[name="prescriberinstitution"]'
      ).value,
      phone1: document.querySelector('input[name="phone1"]').value,
      email: document.querySelector('input[name="email"]').value,
      CommissaryNameLast: document.querySelector(
        'input[name="CommissaryNameLast"]'
      ).value,
      CommissaryNameFirst: document.querySelector(
        'input[name="CommissaryNameFirst"]'
      ).value,
      CommissaryNameMiddle: document.querySelector(
        'input[name="CommissaryNameMiddle"]'
      ).value,
      address2: document.querySelector('input[name="address2"]').value,
      city2: document.querySelector('input[name="city2"]').value,
      state: document.querySelector('input[name="state"]').value,
      zip: document.querySelector('input[name="zip"]').value,
      phone2: document.querySelector('input[name="phone2"]').value,
      email2: document.querySelector('input[name="email2"]').value,
      diagnosis: document.querySelector('textarea[name="diagnosis"]').value,
      message: document.querySelector('textarea[name="message"]').value,

      // Add other form fields here
    };

    // Update the formData state with the captured data
    setFormData(formDataFromInputs);
  };

  return (
    <div className="prescription-form-container">
      {/* <ProgressBar /> */}
      <PatientAndUpload1 />
      {formData && Object.keys(formData).length > 0 && (
        <NotesAndReview formData={formData} />
      )}
    </div>
  );
};

export default PrescriptionFormContainer;
