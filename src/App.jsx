import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import  AuthenticatedLandingPage from "./components/AuthenticatedLandingPage/AuthenticatedLandingPage";
import LandingPage from "./components/LandingPages/LandingPage";
import PrivateRoute from "./PageContainer";
import ContactUs from "./components/ContactUs/ContactUs";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import OTPVerification from "./components/RegistrationForm/OtpVerification";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logginError, setLoginError] = useState("");
  // State for userData
  const [userData, setUserData] = useState({});

  // Function to update userData state
  const handleUserDataUpdate = (newUserData) => {
    setUserData(newUserData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setLoggedIn(true);
      const parsedUser = user ? JSON.parse(user) : null;
      setUser(parsedUser);
    }
  }, []);

  return (
    <div className="app-container">
      {" "}
      {/* Use the app-container class you've defined */}
      <Router forceRefresh={true} basename="/">
        <NavBar
          loggedIn={loggedIn}
          user={user}
          setLoggedIn={setLoggedIn}
          setUser={setUser}
          setLoginError={setLoginError}
        />
        <div className="content-wrapper">
          {" "}
          {/* Use the content-wrapper class you've defined */}
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <AuthenticatedLandingPage user={user} userData={userData} />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/register"
              element={
                loggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <RegistrationForm
                    setUser={setUser}
                    user={user}
                    setLoginError={setLoginError}
                    setLoggedIn={setLoggedIn}
                  />
                )
              }
            />
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginForm
                    setUser={setUser}
                    user={user}
                    setLoginError={setLoginError}
                    setLoggedIn={setLoggedIn}
                    setUserData={handleUserDataUpdate}
                  />
                )
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <AuthenticatedLandingPage user={user} />
                </PrivateRoute>
              }
            />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer className="footer" />{" "}
        {/* Use the footer class you've defined */}
      </Router>
    </div>
  );
}
