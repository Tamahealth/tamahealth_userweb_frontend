import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

const stylesDesktop = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  formContainer: {
    width: "25%",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
};

// Style for mobile screens
const stylesMobile = {
  container: {
    padding: "1rem",
    width: "100%",
  },
  formContainer: {
    padding: "1rem",
  },
};

export default function LoginForm({
  setUser,
  setLoggedIn,
  setLoginError,
  setUserData,
}) {
  const [credential, setCredential] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loginOption, setLoginOption] = useState("email");

  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;
  const styles = isMobile ? stylesMobile : stylesDesktop;

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
    <div className="p-4 w-full max-w-[400px] mx-auto mt-10">
      <div className="p-4">
        <h1 className="text-2xl mb-3 font-bold text-blue-500 text-center">
          Login Here
        </h1>
        <h4 className="text-xl mb-6 font-bold text-blue-500 text-center">
          Welcome to TAMAHealth
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
        <form
          onSubmit={handleSignIn}
          className="space-y-4 h-[300px] overflow-y-auto"
        >
          {loginOption === "email" ? (
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
                  requiredrfg="true"
                  className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
                />
                <div className="text-right mb-4 mt-4">
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="text-black !important">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[+1]{0,2}[0-9]{10}"
                autocomplete="tel"
                className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
              />
            </div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded mt-4 w-full"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleSignInWithGoogle}
            className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded mx-auto"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Continue with Google
          </button>
        </div>
        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
