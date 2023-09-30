import React from "react";
import jwtDecode from "jwt-decode";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export const sendOtp = async (phoneNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/otp/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });
    console.log("Response:", response, "Is ok?", response.ok);

    const data = await response
      .text()
      .then((text) => (text ? JSON.parse(text) : {}));
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error in sending OTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
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
        } else {
          console.log("OTP not sent", otpResponse.message);
          setLoginError(otpResponse.message);
        }
      } else {
        console.log("Something went wrong, otpResponse is undefined");
        setLoginError("Failed to send OTP");
      }
    } else {
      setLoginError(data.message);
      console.log(data.message);
    }
  } catch (error) {
    console.error("Error is:", error);
    return { success: false, message: "Failed to register" };
  }
};
