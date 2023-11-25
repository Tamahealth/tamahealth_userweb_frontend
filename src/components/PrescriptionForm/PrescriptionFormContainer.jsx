// PrescriptionFormContainer.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrescriptionFormProvider } from "./PrescriptionFormContext";
import PatientAndUpload1 from "./PatientAndUpload1";
import PatientAndUpload2 from "./PatientAndUpload2";
import PatientAndUpload3 from "./PatientAndUpload3";
import NotesAndReview from "./NotesAndReview";

export default function PrescriptionFormContainer() {
  return (
    <PrescriptionFormProvider>
      <div className="prescription-form-container">
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="patient-and-upload-1" />}
          />
          <Route path="patient-and-upload-1" element={<PatientAndUpload1 />} />
          <Route path="patient-and-upload-2" element={<PatientAndUpload2 />} />
          <Route path="patient-and-upload-3" element={<PatientAndUpload3 />} />
          <Route path="review-and-submit" element={<NotesAndReview />} />
        </Routes>
      </div>
    </PrescriptionFormProvider>
  );
}
