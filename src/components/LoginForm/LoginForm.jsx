import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export default function LoginForm({
  setUser,
  setLoggedIn,
  setLoginError,
  setUserData,
}) {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setLoggedIn(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLoginSubmit = async ({ credential, password }) => {
    let isEmail = credential.includes("@");
    let requestBody = isEmail
      ? { email: credential, password }
      : { phoneNumber: credential, password };

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const decodedToken = jwtDecode(token);
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
    if (passwordError === true) {
      setPasswordError(false);
    }
    setPassword(event.target.value);
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle({ setLoggedIn, navigate, setUser });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    handleLoginSubmit({
      credential,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {passwordError && (
            <span className="text-red-500">Incorrect password!</span>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Sign In with Google
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
