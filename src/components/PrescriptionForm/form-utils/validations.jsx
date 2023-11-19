const validatePage1From = (formData) => {
  let errors = {};

  if (
    !formData.PatientFirstName ||
    !/^[a-zA-Z]+$/i.test(formData.PatientFirstName)
  ) {
    errors.PatientFirstName =
      "First Name is required and should contain only letters.";
  }

  if (
    !formData.PatientLastName ||
    !/^[a-zA-Z]+$/i.test(formData.PatientLastName)
  ) {
    errors.PatientLastName =
      "Last Name is required and should contain only letters.";
  }

  if (!formData.PatientSex) {
    errors.PatientSex = "Sex is required.";
  }

  if (!formData.PatientAddress) {
    errors.PatientAddress = "Address is required.";
  }

  if (!formData.PatientCity) {
    errors.PatientCity = "City is required.";
  }

  if (!formData.PatientCountry) {
    errors.PatientCountry = "Country is required.";
  }

  // Optional: Validate phone number format
  if (!formData.PatientCellular) {
    errors.PatientCellular = "Phone Number is required.";
  }

  if (formData.PatientBirthDate) {
    const birthDate = new Date(formData.PatientBirthDate);
    const currentDate = new Date();
    const yearDifference = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    let calculatedAge = yearDifference;
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      calculatedAge--;
    }

    const inputAge = parseInt(formData.PatientAge, 10);
    if (isNaN(inputAge) || inputAge < 0) {
      errors.PatientAge = "Please enter a valid positive age.";
    } else if (Math.abs(calculatedAge - inputAge) > 1) {
      errors.PatientAge =
        "Age does not match with Birthdate. Age should be within one year of the calculated age based on the birthdate.";
    }
  } else if (!formData.PatientAge) {
    errors.PatientAge = "Age is required.";
  }

  return errors;
};

const validatePage2From = (formData, uploadedFileInfo) => {
  let errors = {};

  if (
    !formData.PrescriberFullName ||
    !/^[a-zA-Z\s]+$/i.test(formData.PrescriberFullName)
  ) {
    errors.PrescriberFullName =
      "Prescriber's full name is required and should contain only letters.";
  }

  if (
    !formData.PrescriberOccupation ||
    !/^[a-zA-Z\s]+$/i.test(formData.PrescriberOccupation)
  ) {
    errors.PrescriberOccupation =
      "Occupation is required and should contain only letters.";
  }

  if (!formData.PrescriberInstitution) {
    errors.PrescriberInstitution = "Prescriber Institution is required.";
  }

  if (!formData.PrescriberPhone) {
    errors.PrescriberPhone = "Prescriber Phone is required.";
  }

  if (
    !formData.PrescriberEmail ||
    !/\S+@\S+\.\S+/.test(formData.PrescriberEmail)
  ) {
    errors.PrescriberEmail = "A valid email address is required.";
  }

  if (!uploadedFileInfo.fileKey) {
    errors.fileUpload = "A file must be uploaded.";
  }
  return errors;
};

const validatePage3Form = (formData) => {
  let errors = {};

  // Validate Street Address
  if (!formData.AccountHolderAddress) {
    errors.AccountHolderAddress = "Street Address is required.";
  }

  // Validate State
  if (!formData.AccountHolderState) {
    errors.AccountHolderState = "State selection is required.";
  }

  // Validate City
  if (!formData.AccountHolderCity) {
    errors.AccountHolderCity = "City is required.";
  }

  // Validate ZIP Code
  if (!formData.AccountHolderZipCode) {
    errors.AccountHolderZipCode = "ZIP Code is required.";
  } else if (!/^\d{5}(-\d{4})?$/.test(formData.AccountHolderZipCode)) {
    errors.AccountHolderZipCode = "Invalid ZIP Code format.";
  }

  return errors;
};

export { validatePage1From, validatePage2From, validatePage3Form };
