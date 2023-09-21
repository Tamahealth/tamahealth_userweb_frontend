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
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Email or Phone Number"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && (
          <span style={{ color: "red" }}>Incorrect password!</span>
        )}
        <button type="submit">Sign In</button>
        <button type="button" onClick={handleSignInWithGoogle}>
          Sign In with Google
        </button>
      </form>
      <div>
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
}
