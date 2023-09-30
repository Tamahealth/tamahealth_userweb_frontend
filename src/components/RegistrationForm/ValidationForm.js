export const validateForm = (
  email,
  password,
  firstName,
  lastName,
  confirmPassword
) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = "Invalid email format!";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (/\d/.test(firstName) || /\d/.test(lastName)) {
    errors.numeric = "First name and last name cannot contain numbers.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};
