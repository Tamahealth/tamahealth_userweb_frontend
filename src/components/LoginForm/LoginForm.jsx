import React, { useState, useEffect } from "react";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";
import GoogleLoginButton from "./GoogleLoginButton";
import SignUpPrompt from "./SignUpPrompt";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm({ setLoginError, setUserData, setLoggedIn }) {
  const [loginOption, setLoginOption] = useState("email");

  const handleEmailLoginError = () => {
    toast.error("Email login error", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handlePhoneLoginError = () => {
    toast.error("Phone login error", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="p-4 w-full max-w-[400px] mx-auto mt-10">
      <div className="p-4">
        <h1 className="text-2xl mb-3 font-bold text-blue-500 text-center">
          Login Here
        </h1>
        <h4 className="text-xl mb-6 font-bold text-blue-500 text-center">
          Welcome to Todo
        </h4>
        <hr />

        <div className="flex justify-center mb-4">
          <button
            className={`py-2 px-4 mx-2 ${
              loginOption === "email" ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setLoginOption("email")}
          >
            Email
          </button>
          <button
            className={`py-2 px-4 mx-2 ${
              loginOption === "phone" ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setLoginOption("phone")}
          >
            Phone
          </button>
        </div>

        {loginOption === "email" ? (
          <EmailLogin
            setUserData={setUserData}
            setLoggedIn={setLoggedIn}
            onError={handleEmailLoginError}
          />
        ) : (
          <PhoneLogin
            setUserData={setUserData}
            setLoggedIn={setLoggedIn}
            onError={handlePhoneLoginError}
          />
        )}

        <GoogleLoginButton
          setUserData={setUserData}
          setLoggedIn={setLoggedIn}
        />

        <SignUpPrompt />
      </div>
    </div>
  );
}