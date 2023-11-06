import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/solid";
import NextButton from "./PrescriptionFormNext.jsx";
// import "./prescription.css";

// here is what I have changed:
// I broke down the PatientAndUpload component into 3 components and this is the first one
// cliking on the next button will take you to the second component
// clicking on the next button in the second component will take you to the third component
// in app.jsx I have added the routes for the 3 components

// things:
// in app.jsx when calling the elements make sure you pass the props to them like I did for the 2nd component

// concerns:
// should you use the props to pass the formData and handleInputChange function or
// should you use the useContext hook to access the formData and handleInputChange function?
// usecontexr may make your code cleaner, and easy as you don't have to pass the props to the components

// the Navbar and footer or main body of the app display is narrowed down and instead of whole
// width of the screen it only takes 80% or something like that of the screen width
// I see there is a change on tailwind config file if that is the issue.

// please let's address this things as soon as possible.

// as a step, I would put it as
// 1. fix the main layout of navbar
//  1.1 fix the margins
//  1.2 fix the layer thing (I will show you what I mean by picture)
// 2. fix the layout of the footer same as fix 1.1 (width and margins problem)
// 3. fix the layout of the main body of the app (width and margins problem)
// 4. fix the layout of the prescription form (width and margins problem)
// 5. useContext provider and consumer for the PrescriptionFormContainer component
// 5.1 that component is the parent so it should create and provide the context to the children(1,2,3)
// 5.2 the children should consume the context and use the formData and handleInputChange function
// 5.3 finish and integrate the form including the next button.
// 5.4 migrate the styling to tailwind
// 5.4 move the form validation you built in the form-utils folder
//

export default function PatientAndUpload1() {
  const [showTooltip, setShowTooltip] = useState(false);
  // const [currentContainer, setCurrentContainer] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Initialize formData from local storage if available, otherwise use default values
  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    prescriber: "",
    occupation: "",
    prescriberinstitution: "",
    phone1: "",
    email: "",
    CommissaryNameLast: "",
    CommissaryNameFirst: "",
    CommissaryNameMiddle: "",
    address2: "",
    city2: "",
    state: "",
    zip: "",
    phone2: "",
    email2: "",
    diagnosis: "",
    message: "",
    // uploads: [],
    // prescriptionFile: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Save to local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    const enteredAge = parseInt(formData.age, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(enteredAge) || enteredAge < 0 || enteredAge >= 150) {
      errors.age = "Age must be a valid number";
    }

    const enteredBirthYear = currentYear - enteredAge;
    if (enteredBirthYear > currentYear) {
      errors.age = "Age cannot be in the future";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleNextClick = () => {
    navigate("/prescription/patient-and-upload-2");
    // validateForm();
    // if (isFormValid) {
    // }
  };

  return (
    <div className="container">
      <h1 className="text">PATIENT & PRESCRIPTION</h1>
      <h2 className="texts">Patient Info</h2>
      <div className="form-row">
        {/* First Name */}
        <div className="input-data">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            autoComplete="given-name"
            required
          />
          <InformationCircleIcon
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="h-5 w-5 text-blue-500 cursor-pointer ml-2"
          />
          {showTooltip && (
            <div className="absolute text-xs rounded bg-gray-700 text-white p-1">
              Enter the patient's name, not the account holder's.
            </div>
          )}
          {formErrors.firstName && (
            <div className="error">{formErrors.firstName}</div>
          )}
          <div className="underline"></div>
          <label>First Name</label>
        </div>
        {/* Last Name */}
        <div className="input-data">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            autoComplete="family-name"
            required
          />
          {formErrors.firstName && (
            <div className="error">{formErrors.firstName}</div>
          )}
          <div className="underline"></div>
          <label>Last Name</label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          <div className="underline"></div>
          <label>Birthdate</label>
        </div>
        <div className="input-data">
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          {formErrors.age && <div className="error">{formErrors.age}</div>}

          <div className="underline"></div>
          <label>Age</label>
        </div>
        <div className="input-datas">
          <label>Sex:</label>
        </div>
        <div className="input-datas">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleInputChange}
            />
            <span className="design"></span>
            <span className="value">Male</span>
          </label>
        </div>
        <div className="input-datas">
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
            />
            <span className="design"></span>
            <span className="value">Female</span>
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <div className="underline"></div>
          <label>Patient Address</label>
        </div>
        <div className="input-data">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>City</label>
        </div>
        <div className="input-data">
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
          <div className="underline"></div>
          <label>Country</label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <div className="underline"></div>
          <label>Cellular</label>
        </div>
      </div>

      <div className="space-y-4">
        <NextButton onClick={handleNextClick} />
      </div>
    </div>
  );
}
