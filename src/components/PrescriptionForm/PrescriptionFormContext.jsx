import React, { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "./form-utils/helpers";

// Create Context object
export const PrescriptionFormContext = createContext();

// Provider Component
export const PrescriptionFormProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(() => {
    // Get data from local storage or initialize to default values
    return JSON.parse(localStorage.getItem("formData")) || {};
  });

  // Use effect to update local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Function to update formData
  const updateFormData = (newData) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
  };

  // Function to clear formData
  const clearFormData = () => {
    localStorage.removeItem("formData");
    setFormData({});
  };

  // Function to load user info
  const loadUserInfo = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId in localStorage");
      return;
    }

    try {
      const data = await fetchUserInfo(userId);
      setUserInfo({
        AccountHolderFirstName: data.first_name,
        AccountHolderLastName: data.last_name,
        AccountHolderEmail: data.email,
        AccountHolderPhone: data.phone_number,
      });
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  // The value that will be given to the context
  const contextValue = {
    formData,
    updateFormData,
    clearFormData,
    userInfo,
    loadUserInfo,
    error,
  };

  return (
    <PrescriptionFormContext.Provider value={contextValue}>
      {children}
    </PrescriptionFormContext.Provider>
  );
};
