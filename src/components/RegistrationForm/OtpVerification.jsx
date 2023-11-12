import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [seconds, setSeconds] = useState(120); // 180 seconds or 3 minutes
  const [expired, setExpired] = useState(false);

  const navigate = useNavigate();

  let timeString;
  if (Math.floor(seconds / 60) > 0) {
    timeString = `Code expires in ${Math.floor(seconds / 60)}:${String(
      seconds % 60
    ).padStart(2, "0")}`;
  } else {
    timeString = "Code expired";
  }

  // Input checking for OTP
  useEffect(() => {
    const isValidOtp = /^\d+$/.test(otp); // Checks if OTP is all digits
    setButtonDisabled(!isValidOtp || otp.length < 6); // my otp is 6 digits
  }, [otp]);

  // Countdown timer for OTP expiration
  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true);
      setButtonDisabled(true); // Disable the verify button after expires
    } else {
      setExpired(false);
    }
  }, [seconds]);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      // Reset and show Resend option when time is up
      setExpired(true);
      setButtonDisabled(true); // Disable the verify button after expires
    }
  }, [seconds]);

  const verifyOtp = async () => {
    // Get the stored phone number from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedPhoneNumber = storedUser ? storedUser.phoneNumber : null;

    const enteredOtp = otp;

    // to ensure that both phoneNumber and OTP are available
    if (!storedPhoneNumber || !enteredOtp) {
      console.error("Phone number or OTP is missing");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: storedPhoneNumber,
          code: enteredOtp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verified successfully");
        // Store the token and user data in local storage after successful verification
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
        toast.success("OTP verified successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.log("Failed to verify OTP", data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const resendCode = async () => {
    try {
      const response = await fetch("/api/auth/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        console.log("OTP sent successfully");
        setSeconds(180);
        toast.success("OTP sent successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const data = await response.json();
        console.log("Failed to resend OTP", data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error resending OTP", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setSeconds(180);
  };

  return (
    <div className="p-4 w-full max-w-[400px] mx-auto mt-10 mb-10 md:mb-0">
      <ToastContainer />
      {/* Margin bottom added for mobile */}
      <h1 className="text-2xl mb-3 font-boldtext-blue-500 text-center">
        Verify Your Code
      </h1>
      <p className="text-center mb-4">
        Please enter the code we sent to your phone.
      </p>
      <form className="space-y-4">
        <div className="mb-4">
          <label className="text-black">Enter Code</label>
          <input
            name="otp"
            type="tel"
            placeholder="Enter Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className={`w-full py-2 px-3 border rounded text-blue bg-sky-50 ${
              otp && !/^\d+$/.test(otp) ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            disabled={isButtonDisabled}
            className={`bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={verifyOtp}
          >
            Verify
          </button>
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={resendCode}
          >
            Resend Code
          </a>
        </div>
      </form>
      <p className="mt-4 text-center">{timeString}</p>
      <div className="text-center mt-5">
        <a
          onClick={() => navigate("/Login")}
          className="text-blue-500 hover:underline"
        >
          Back to Email and Password
        </a>
      </div>
    </div>
  );
}