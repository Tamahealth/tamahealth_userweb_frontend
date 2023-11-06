import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/solid";
import { PrescriptionForm } from "../PrescriptionForm/index";
import NotesAndReview from "../PrescriptionForm/NotesAndReview";
export default function NavBar({
  loggedIn,
  user,
  setUser,
  setLoggedIn,
  setLoginError,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDataID, setUserDataID] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userID = localStorage.getItem("userId");
    setUserDataID(userID);
    setSelectedMenu(location.pathname);

    if (storedUser && storedUser !== "undefined") {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoggedIn(true); // Update loggedIn state
    }
  }, [location, setUser, setLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    setUser(null);
    setLoginError("");
    navigate("/");
  };

  const MenuButton = ({ label, path }) => (
    <button
      onClick={() => setSelectedMenu(path)}
      className={`text-gray-600 hover:bg-gray-200 px-2 py-1 rounded ${
        selectedMenu === path ? "underline" : ""
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white p-2 h-24 shadow-md">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to="/" className="text-blue-500 text-2xl font-bold">
          TAMAHealth
        </Link>
        <button
          className="md:hidden ml-auto"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon className="h-6 w-6 text-blue-500" />
        </button>
        <div className={`hidden md:flex ml-auto space-x-4 items-center mr-20`}>
          <MenuButton label="Home" path="/" />
          <MenuButton label="About Us" path="/AboutUs" />
          <MenuButton label="Contact Us" path="/ContactUs" />
          <MenuButton label="FAQ" path="/FAQ" />
        </div>
        {loggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
            {/* <Avatar src={avatarUrl} className="ml-4"></Avatar> */}
          </>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/prescription"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          </div>
        )}
      </div>
      {showMenu && (
        <div
          style={{
            backgroundColor: "white",
            zIndex: 1000,
            position: "relative",
          }}
          className="md:hidden p-2 transition-all duration-500 ease-in-out"
        >
          <div className="flex flex-col space-y-1">
            <MenuButton
              label="Home"
              path="/"
              additionalClasses="ml-2 border-b-1"
            />

            <MenuButton
              label="About Us"
              path="/AboutUs"
              additionalClasses="ml-2 border-b-1"
            />
            <MenuButton
              label="Contact Us"
              path="/ContactUs"
              additionalClasses="ml-2 border-b-1"
            />
            <MenuButton
              label="FAQ"
              path="/FAQ"
              additionalClasses="ml-2 border-b-1"
            />
            {!loggedIn && (
              <button
                onClick={() => setSelectedMenu("/register")}
                className={`text-gray-600 hover:bg-gray-200 px-2 py-1 rounded ml-2`}
              >
                Register
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
