import React, { useState, useEffect } from "react";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";
import GoogleLoginButton from "./GoogleLoginButton";
import SignUpPrompt from "./SignUpPrompt";

export default function LoginForm({ setLoginError, setUserData, setLoggedIn }) {
  const [loginOption, setLoginOption] = useState("email");

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
            setLoginError={setLoginError}
            setUserData={setUserData}
            setLoggedIn={setLoggedIn}
          />
        ) : (
          <PhoneLogin
            setUserData={setUserData}
            setLoggedIn={setLoggedIn}
            setLoginError={setLoginError}
          />
        )}

        <GoogleLoginButton />

        <SignUpPrompt />
      </div>
    </div>
  );
}
