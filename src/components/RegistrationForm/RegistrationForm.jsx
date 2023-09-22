import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import "./RegistrationForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export default function RegistrationForm({
  setLoggedIn,
  setUser,
  setLoginError,
  user,
}) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegistrationSubmit = async ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    navigate,
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        const decodedToken = jwtDecode(token);
        const userData = {
          ...decodedToken,
          username: decodedToken.username,
          email: decodedToken.email,
          fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
        };
        localStorage.setItem("token", token);
        localStorage.setItem("userId", decodedToken.userId);
        console.log("user Data:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userData", "");
        localStorage.setItem("userLoggedInBefore", "true");
        setUser(userData);

        setLoggedIn(true);
        setLoginError("");
        navigate("/");
        console.log(data.message);
      } else {
        setLoginError(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error is:", error);
    }

    const handleSignUpWithGoogle = () => {
      // TODO: Google SIGN UP HERE
      console.log("Google Sign Up");
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({});

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Invalid email format!",
      }));
      return;
    }

    // Checks password length
    if (password.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password must be at least 8 characters long.",
      }));
      return;
    }

    // Checks if first name, last name, and username contain numbers
    if (/\d/.test(firstName) || /\d/.test(lastName) || /\d/.test(username)) {
      setErrors((prevState) => ({
        ...prevState,
        numeric: "First name, last name, and username cannot contain numbers.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Perform registration logic
    handleRegistrationSubmit({
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    });
    setErrors({});
  };

  return (
    <div className="container">
      <div className="form-container" style={{ height: "105vh" }}>
        <h1 className="title mt-4">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          </div>
          <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          </div>
          <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          </div>
          <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input-field"
          />
          {Object.values(errors).map((error) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
          </div>
          <button
            type="submit"
            className="button bg-blue-500 text-black"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center" style={{ marginTop: "7vh" }}>
          <a href="/register" className="text-black">
            Create new account
          </a>
        </div>
        <div style={{ marginTop: "3vh" }} className="mb-7 ">
          <a
            href="#"
            // onClick={handleSignUpWithGoogle}
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
