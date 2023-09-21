import React, { useState } from "react";
import jwtDecode from "jwt-decode";

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
    username,
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
          username,
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
      username,
      email,
      firstName,
      lastName,
      password,
    });
    setErrors({});
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-4">Create an Account</h1>

        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {Object.values(errors).map((error) => (
          <p className="text-red-500 mb-2" key={error}>
            {error}
          </p>
        ))}
        <button
          className="bg-blue-500 text-white p-2 w-full mb-4 rounded"
          type="submit"
        >
          Register
        </button>
        <button
          className="bg-red-500 text-white p-2 w-full mb-4 rounded"
          //   onClick={handleSignUpWithGoogle}
        >
          Sign Up with Google
        </button>
        <div className="text-center">
          <a className="underline text-blue-500" href="/login">
            Already have an account? Sign in
          </a>
        </div>
      </form>
    </div>
  );
}
