// PrescriptionForm/NextButton.jsx
import React from "react";
import { Link } from "react-router-dom";

// Enhanced NextButton.jsx
const NextButton = ({ isDisabled, to }) => {
  return (
    <div className="mt-4 flex justify-end">
      <Link
        to={isDisabled ? "#" : to}
        className={`px-6 py-2 rounded-full text-white transition-all duration-200 ease-in-out ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700 shadow-lg"
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default NextButton;
