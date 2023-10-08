import React, { useState } from "react";
import jwt_decode from "jwt-decode";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export default function EmailLogin({
  setUserData,
  setLoggedIn,
  setLoginError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
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
        window.location.href = "/";
      } else {
        setLoginError(data.message);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordChange = (event) => {
    if (passwordError) {
      setPasswordError(false);
    }
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <div className="text-left">
          <label className="text-black">Email</label>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
      </div>
      <div className="mb-4">
        <div className="text-left">
          <label className="text-black">Password</label>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
        <div className="text-right mb-4 mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded mt-4 w-full"
          type="submit"
          onClick={handleEmailLogin}
        >
          Sign In with Email
        </button>
      </div>
    </>
  );
}
