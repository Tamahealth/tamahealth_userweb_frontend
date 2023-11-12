import React, { useState } from "react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";
import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PhoneLogin({ setLoggedIn, setUserData, setLoginError }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    // Logic to send the OTP to the phone number
    try {
      const response = await fetch(`${BASE_URL}/api/auth/otp/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.error("Failed to send OTP.");
        toast.error("Error: Failed to send OTP.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    // Logic to verify the entered OTP
    try {
      const response = await fetch(`${BASE_URL}/api/auth/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phone, code: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const decodedToken = jwt_decode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", decodedToken.userId);
        const userData = {
          ...decodedToken,
          email: decodedToken.email,
          fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUserData(userData);
        setLoggedIn(true);
        setLoginError("");
        window.location.href = "/home";
        toast.success("Logged in successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        // Handle OTP verification failure
        console.error(data.error);
        toast.error("Error:", data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="mb-4">
        <label className="text-black">Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="[+1]{0,2}[0-9]{10}"
          autoComplete="tel"
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
        {!otpSent ? (
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded mt-4 w-full"
            onClick={handleSendOtp}
          >
            Send Code
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              className="w-full py-2 px-3 border rounded text-blue bg-sky-50 mt-4"
            />
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded mt-4 w-full"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default PhoneLogin;