// Import useContext from React and our context
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionFormContext } from "./PrescriptionFormContext";

const PatientAndUpload1 = () => {
  const { formData, updateFormData } = useContext(PrescriptionFormContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    updateFormData({ [e.target.name]: value });
  };

  const handleNextClick = () => {
    navigate("/prescription/patient-and-upload-2");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-blue-800 text-2xl mb-4">
            PATIENT & PRESCRIPTION
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="mb-6 md:mb-0">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first-name"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="text"
              id="first-name"
              placeholder="First Name"
              name="PatientFirstName"
              value={formData.PatientFirstName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 md:mb-0">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="text"
              id="last-name"
              placeholder="Last Name"
              name="PatientLastName"
              value={formData.PatientLastName || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="mb-6 md:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthdate"
            >
              Birthdate (optional)
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="date"
              id="birthdate"
              placeholder="mm/dd/yyyy"
              name="PatientBirthDate"
              value={formData.PatientBirthDate || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 md:mb-0 md:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="number"
              id="age"
              placeholder="Age"
              name="PatientAge"
              value={formData.PatientAge || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="mb-6 md:mb-0 md:col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sex"
              >
                Sex
              </label>
              <div className="mt-2 flex flex-wrap">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="PatientSex"
                    value={formData.PatientSex || ""}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="PatientSex"
                    value={formData.PatientSex || ""}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="mb-6 lg:mb-0 lg:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Patient Address
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="text"
              id="address"
              placeholder="Street Address"
              name="PatientAddress"
              value={formData.PatientAddress || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="mb-6 lg:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
                type="text"
                id="city"
                placeholder="City"
                name="PatientCity"
                value={formData.PatientCity || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 max-w-md">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
                type="text"
                id="country"
                placeholder="Country"
                name="PatientCountry"
                value={formData.PatientCountry || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-6">
          <div className="flex-1 max-w-md">
            {" "}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Cellular
            </label>
            <input
              className="shadow appearance-none border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2 px-3 leading-tight"
              type="tel"
              id="cellular"
              placeholder="Phone Number"
              autoComplete="on"
              htmlFor="tel"
              name="PatientCellular"
              value={formData.PatientCellular || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:self-end">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="button"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAndUpload1;
