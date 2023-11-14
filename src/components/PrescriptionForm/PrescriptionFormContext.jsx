import React, { createContext, useState, useEffect } from "react";
import {
  fetchUserInfo,
  handleFileUpload,
  deletePrescriptionFile,
} from "./form-utils/helpers";

// Create Context object
export const PrescriptionFormContext = createContext();

// Provider Component
export const PrescriptionFormProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [deletionSuccessMessage, setDeletionSuccessMessage] = useState("");
  const [deletionErrorMessage, setDeletionErrorMessage] = useState("");

  const [uploadedFileInfo, setUploadedFileInfo] = useState({
    fileUrl: "",
    fileKey: "",
  });

  const [formData, setFormData] = useState(() => {
    // Get data from local storage or initialize to default values
    return JSON.parse(localStorage.getItem("formData")) || {};
  });

  // Use effect to update local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("uploadedFileInfo", JSON.stringify(uploadedFileInfo));
  }, [uploadedFileInfo]);

  useEffect(() => {
    const storedUploadedFileInfo = localStorage.getItem("uploadedFileInfo");
    if (storedUploadedFileInfo) {
      setUploadedFileInfo(JSON.parse(storedUploadedFileInfo));
    }
  }, []);

  // Function to update formData
  const updateFormData = (newData) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
  };

  // Function to clear formData
  const clearFormData = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("uploadedFileInfo");
    setFormData({});
    setUploadedFileInfo({ fileUrl: "", fileKey: "" });
  };

  // Function to upload file
  const uploadFile = async (file) => {
    try {
      const uploadResult = await handleFileUpload(file);
      const { fileUrl, fileKey } = uploadResult;
      setUploadedFileInfo({ fileUrl, fileKey });
      updateFormData({ prescriptionFileUrl: fileUrl });
      return uploadResult;
    } catch (error) {
      setError(error.message);
      console.error("File upload failed:", error);
    }
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

  const handleFileDeletion = async () => {
    try {
      const { fileKey } = uploadedFileInfo;
      if (fileKey) {
        const result = await deletePrescriptionFile(fileKey);
        setUploadedFileInfo({ fileUrl: "", fileKey: "" });
        updateFormData({ ...formData, prescriptionFile: "" });
        if (result.success) {
          console.log(result.message);
          // Clear any existing error messages
          setDeletionErrorMessage("");
          // Display a success message
          setDeletionSuccessMessage("File removed successfully.");

          setTimeout(() => setDeletionSuccessMessage(""), 5000);
        } else {
          console.error(result.error);
          setDeletionErrorMessage(result.error);
        }
      } else {
        console.error("No file key found");
        setDeletionErrorMessage("No file key found");
      }
    } catch (error) {
      console.error("Deletion failed:", error.message);
      setDeletionErrorMessage("Deletion failed: " + error.message);
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
    uploadFile,
    handleFileDeletion,
    uploadedFileInfo,
    setUploadedFileInfo,
    deletionSuccessMessage,
    deletionErrorMessage,
    setDeletionSuccessMessage,
    setDeletionErrorMessage,
  };

  return (
    <PrescriptionFormContext.Provider value={contextValue}>
      {children}
    </PrescriptionFormContext.Provider>
  );
};
