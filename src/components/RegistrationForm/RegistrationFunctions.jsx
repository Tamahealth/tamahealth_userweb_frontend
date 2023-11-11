import React from "react";
import jwtDecode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export const sendOtp = async (phoneNumber) => {
  // code for sending OTP
};

export const handleRegistrationSubmit = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  setLoggedIn,
  setUser,
  setLoginError,
  navigate,
  BASE_URL,
  setOtpSent,
  showToast,
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const token = data.token;
      const decodedToken = jwtDecode(token);
      const userData = {
        ...decodedToken,
        username: decodedToken.username,
        email: decodedToken.email,
        fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
      };

      // Storing user data but not setting user as logged in yet
      localStorage.setItem("token", token);
      localStorage.setItem("userId", decodedToken.userId);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userData", "");
      localStorage.setItem("userLoggedInBefore", "true");

      // setUser(userData);
      // setLoggedIn(true);
      // setLoginError("");
      // navigate("/home");

      // Proceeding with OTP sending
      const otpResponse = await sendOtp(phoneNumber);
      if (otpResponse) {
        if (otpResponse.success) {
          setOtpSent(true);
          navigate("/otp-verification");
          showToast("Registration successful", "success");
        } else {
          console.log("OTP not sent", otpResponse.message);
          setLoginError(otpResponse.message);
          showToast("Failed to send OTP", "error");
        }
      } else {
        console.log("Something went wrong, otpResponse is undefined");
        setLoginError("Failed to send OTP");
        showToast("Failed to send OTP", "error");
      }
    } else {
      setLoginError(data.message);
      console.log(data.message);
      showToast("Failed to register", "error");
    }
  } catch (error) {
    console.error("Error is:", error);
    showToast("Failed to register", "error");
    return { success: false, message: "Failed to register" };
  }
};

const MainComponent = () => {
  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    } else if (type === "error") {
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegistrationSubmit({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      setLoggedIn,
      setUser,
      setLoginError,
      navigate,
      BASE_URL,
      setOtpSent,
      showToast, // Pass the showToast function to handleRegistrationSubmit
    });

    if (result.success) {
      setErrors({});
    } else {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div>
      {/* Form and other components */}
      <ToastContainer />
    </div>
  );
};

export default MainComponent;