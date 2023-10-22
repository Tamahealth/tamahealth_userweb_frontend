// PrescriptionForm/PrescriptionFormContainer.jsx

import React, { useState } from "react";
import PatientAndUpload from "./PatientAndUpload";
import NotesAndReview from "./NotesAndReview";
import ProgressBar from "./ProgressBar";

const PrescriptionFormContainer = () => {
  const [isFormComplete, setIsFormComplete] = useState(false); // This state will be set based on form validation logic later

  const goToReviewAndSubmit = () => {
    // Code to navigate to the 'Review and Submit' component
  };

  return (
    <div className="prescription-form-container">
      <ProgressBar />
      <PatientAndUpload />
      <NotesAndReview />
    </div>
  );
};

export default PrescriptionFormContainer;
