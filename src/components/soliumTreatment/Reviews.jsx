import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SoliumFormContext } from "./SoliumFormContext";

const Reviews = () => {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { formData, userInfo } = useContext(SoliumFormContext);

  const handleEdit = () => {
    navigate("/solium/symptoms-form-1");
  };

  const handleNotesChange = (e) => {
    if (e.target.value.length <= 500) {
      setNotes(e.target.value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">Review and Confirm</h2>
        </div>
        {/* Patient Information */}
        
        </div>
      </div>
    
  );
};

export default Reviews;
