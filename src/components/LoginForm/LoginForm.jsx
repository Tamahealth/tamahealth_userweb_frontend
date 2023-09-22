import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
    <div className="container">
      <div className="form-container" style={{ height: "80vh" }}>
        <form onSubmit={handleSignIn} className="space-y-4">
          <h2 className="title mt-4" style={{ marginBottom: "7v h" }}>
            Login here
          </h2>

          {/* <p className="welcome mt-2 mb-4">Welcome back</p> */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className="input-field "
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="input-field"
            />
            {passwordError && (
              <span className="text-red-500">Incorrect password!</span>
            )}
          </div>
          <a href="#" className="text-blue-600 hover:underline ml-60">
            Forgot Password?
          </a>
          <button type="submit" className="button bg-blue-500 text-black">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center" style={{ marginTop: "7vh" }}>
          <a href="/register" className="text-black">
            Create new account
          </a>
        </div>
        <div style={{ marginTop: "7vh" }} className="mb-7 ">
          <a
            href="#"
            onClick={handleSignInWithGoogle}
            className="text-blue-500 hover:underline ml-20"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            or continue with google
          </a>
        </div>
      </div>
    </div>
  );
}
