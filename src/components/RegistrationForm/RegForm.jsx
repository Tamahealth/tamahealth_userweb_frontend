import React, { useState } from 'react';

export default function FormComponent({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  handleSubmit,
  setLoginError,
  errors,
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 min-h-[300px] overflow-y-auto"
    >
      <div className="mb-4 mt-4">
        <label className="text-black">First Name</label>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
      </div>
      <div className="mb-4">
        <label className="text-black">Last Name</label>
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
      </div>
      <div className="mb-4">
        <label className="text-black">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
      </div>
      <div className="mb-4">
        <label className="text-black">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
      </div>
      <div className="mb-4">
        <label className="text-black">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded text-blue bg-sky-50"
        />
      </div>
      <div className="mb-4">
        <label className="text-black">Phone Number</label>
        <div className="flex items-center">
          <span className="inline-block bg-gray-200 text-gray-700 p-2 rounded-l">
            +1
          </span>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full py-2 px-3 border rounded-r text-blue bg-sky-50 flex-1"
          />
        </div>
      </div>
      {Object.values(errors).map((error) => (
        <p className="text-red-500" key={error}>
          {error}
        </p>
      ))}
      <input
        type="checkbox"
        id="termsAndConditions"
        name="termsAndConditions"
        value="accepted"
        onChange={handleCheckboxChange}
      />
      <label htmlFor="termsAndConditions">I accept the terms and conditions</label>

      <button
        className={`py-2 px-4 rounded mb-8 w-full ${!termsAccepted ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'}`}
        type="submit"
        disabled={!termsAccepted} // Disable the button if terms are not accepted
      >
        Register
      </button>
      
    </form>
  );
}
