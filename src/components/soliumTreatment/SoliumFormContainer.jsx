// PrescriptionFormContainer.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SoliumFormProvider } from "./SoliumFormContext";
import SymptomsForm1 from "./SymptomsForm1";
import SymptomsForm2 from "./SymptomsForm2";
import SymptomsForm3 from "./SymptomsForm3";
import SymptomsForm4 from "./SymptomsForm4";
import Review from "./Reviews";

const SoliumFormContainer = () => {
  return (
    <SoliumFormProvider>
      <div className="prescription-form-container">
        <Routes>
          <Route
            index
            element={<Navigate replace to="symptoms-form-1" />}
          />
          <Route path="symptoms-form-1" element={<SymptomsForm1 />} />
          <Route path="symptoms-form-2" element={<SymptomsForm2 />} />
          <Route path="symptoms-form-3" element={<SymptomsForm3 />} />
          <Route path="symptoms-form-4" element={<SymptomsForm4 />} />
          <Route path="review" element={<Review />} />
        </Routes>
      </div>
    </SoliumFormProvider>
  );
};

export default SoliumFormContainer;
