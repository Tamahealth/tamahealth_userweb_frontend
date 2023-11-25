import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormComponent from "./RegForm";
import { handleRegistrationSubmit, sendOtp } from "./RegistrationFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export default function MainComponent({ setLoggedIn, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

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
      setOtpSent,
      BASE_URL,
    });

    if (result.success) {
      setErrors({});
      showToast("Registration successful", "success");
    } else {
      setErrors({ submit: result.message });
      showToast("Registration failed", "error");
    }
  };

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    } else if (type === "error") {
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="p-4 w-full max-w-[400px] mx-auto mt-10">
      <h1 className="text-2xl mb-3 font-bold text-blue-500 text-center">
        Register Here
      </h1>
      <h4 className="text-xl mb-6 font-bold text-blue-500 text-center">
        Welcome to TAMAHealth
      </h4>
      <hr />
      <FormComponent
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleSubmit={handleSubmit}
        errors={errors}
        setLoginError={setLoginError}
      />

      <div className="mt-10 text-center"></div>
      <div className="text-center mt-5 mb-14">
        <span>Already have an account? </span>
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </div>

      <ToastContainer />
    </div>
  );
}
