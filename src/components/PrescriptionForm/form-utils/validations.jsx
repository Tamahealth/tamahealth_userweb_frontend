export const validatePatientInfo = (formData) => {
  const errors = {};

  // Your validation logic here

  return errors;
};

export const saveFormData = (formData) => {
  localStorage.setItem("formData", JSON.stringify(formData));
};
