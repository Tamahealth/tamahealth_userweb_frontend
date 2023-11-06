import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

export default function GoogleLoginButton({ setUserData, setLoggedIn }) {
  const [users, setUsers] = useState({});

  async function handleCallbackResponse(response, setUserData, setLoggedIn) {
    try {
      if (!response.credential) {
        throw new Error("No token received from Google");
      }

      const userObject = jwt_decode(response.credential);
      console.log("Decoded token from Google response:", userObject);

      const emailResponse = await fetch(`${BASE_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userObject.email }),
      });

      if (emailResponse.ok) {
        const data = await emailResponse.json();
        console.log("Received data from /api/auth/verify-email:", data);

        const decodedToken = jwt_decode(data.token);
        console.log("Decoded token from /api/auth/verify-email:", decodedToken);

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", decodedToken.userId);
        console.log("Stored userId:", localStorage.getItem("userId"));

        const userData = {
          ...decodedToken,
          email: decodedToken.email,
          fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Stored user data:", localStorage.getItem("user"));

        setUserData(userData);
        setLoggedIn(true);
        toast.success("Google Sign-In Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.href = "/"; // Redirect to the home page
        }, 5000);
      } else {
        // Handle the redirection to the register page

        toast.error("Error: No account with that email", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.href = "/register";
        }, 5000);
      }
    } catch (error) {
      console.log("An error occurred: ", error);
      setTimeout(() => {
        toast.error("Google Sign-In Error: " + error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, 5000);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) =>
        handleCallbackResponse(response, setUserData, setLoggedIn),
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      <ToastContainer />
    </div>
  );
}
