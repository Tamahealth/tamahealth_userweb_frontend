// helper.jsx
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const fetchUserInfo = async (userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/prescriptions/user/${userId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return null; // or handle not found user accordingly
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch user data:", error);
    throw error;
  }
};

// This function gets called when a user selects a file to upload
async function handleFileUpload(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/api/prescriptions/upload-file`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("File uploaded, URL:", result.fileUrl);
    if (result.fileUrl && result.fileKey) {
      console.log("File uploaded, URL:", result.fileUrl);
      return { fileUrl: result.fileUrl, fileKey: result.fileKey };
    } else {
      throw new Error("Upload result does not have fileUrl or fileKey");
    }
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
}

const deletePrescriptionFile = async (fileKey) => {
  try {
    const response = await fetch(`${BASE_URL}/api/prescriptions/delete-file`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileKey }),
    });

    if (!response.ok) {
      console.log("HTTP error! status: ", response.status);
      throw new Error(`HTTP error! status: ${response.status.message}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

const splitFormData = (formData) => {
  const usAddressData = {
    address_line_1: formData.AccountHolderAddress,
    apartment_number: formData.AccountHolderApartmentNumber,
    city: formData.AccountHolderCity,
    state: formData.AccountHolderState,
    zip: formData.AccountHolderZipCode,
  };

  const internationalAddressData = {
    full_address: formData.PatientAddress,
    city: formData.PatientCity,
    country: formData.PatientCountry,
  };

  const prescriptionData = {
    prescription_file_url: formData.prescriptionFile,
    prescriber_name: formData.PrescriberFullName,
    prescriber_institution: formData.PrescriberInstitution,
    prescriber_occupation: formData.PrescriberOccupation,
    prescriber_phone: formData.PrescriberPhone,
    prescriber_email: formData.PrescriberEmail,
    patient_notes: formData.AdditionalNotes,
  };
  console.log("Prescription data is", prescriptionData);
  console.log("US address data is", usAddressData);
  console.log("International address data is", internationalAddressData);
  return { usAddressData, internationalAddressData, prescriptionData };
};

function validateFormData(
  usAddressData,
  internationalAddressData,
  prescriptionData
) {
  // Validate US address data
  if (
    !usAddressData.address_line_1 ||
    !usAddressData.city ||
    !usAddressData.state ||
    !usAddressData.zip
  ) {
    console.error("US address data is incomplete");
    return false;
  }

  // Validate international address data
  if (
    !internationalAddressData.full_address ||
    !internationalAddressData.city ||
    !internationalAddressData.country
  ) {
    console.error("International address data is incomplete");
    return false;
  }

  // Validate prescription data
  if (
    !prescriptionData.prescription_file_url ||
    !prescriptionData.prescriber_name ||
    !prescriptionData.prescriber_institution
  ) {
    console.error("Prescription data is incomplete");
    return false;
  }

  // Additional checks for optional fields if needed
  // Example:
  // if (prescriptionData.prescriber_phone && !isValidPhone(prescriptionData.prescriber_phone)) {
  //   console.error("Invalid phone number format");
  //   return false;
  // }

  return true; // All validations passed
}

// // Temporary function for testing
// const testSplitFormData = () => {
//   // Sample formData object mimicking the actual form data
//   const storedFormData = JSON.parse(localStorage.getItem("formData"));
//   if (!storedFormData) {
//     console.error("No formData found in local storage");
//     return;
//   }
//   const { usAddressData, internationalAddressData, prescriptionData } =
//     splitFormData(storedFormData);

//   console.log("Test - US Address Data:", usAddressData);
//   console.log("Test - International Address Data:", internationalAddressData);
//   console.log("Test - Prescription Data:", prescriptionData);
// };

const submitFormData = async (originalFormData) => {
  const { usAddressData, internationalAddressData, prescriptionData } =
    splitFormData(originalFormData);

  // Validate the data here (example validation function call)
  if (
    !validateFormData(usAddressData, internationalAddressData, prescriptionData)
  ) {
    console.error("Validation failed");
    // Handle validation failure (e.g., show an error message to the user)
    return;
  }

  // Data is valid; proceed to send it to the backend
  const formDataToSend = {
    usAddressData,
    internationalAddressData,
    prescriptionData,
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/prescriptions/submit-prescription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formDataToSend),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // remove the formData from local storage
    localStorage.removeItem("formData", "uploadedFileInfo");
    return await response.json();
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw error;
  }
};

export {
  fetchUserInfo,
  handleFileUpload,
  deletePrescriptionFile,
  submitFormData,
  // testSplitFormData,
};
