import React from "react";

export default function AuthenticatedHero({ user }) {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] md:h-[600px] flex flex-col justify-start md:justify-center items-center text-white px-5 py-5 md:py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544991875-5dc1b05f607d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        backgroundPositionY: "650px",
      }}
    >
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-opacity-25 bg-gray-100"></div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2 text-center font-semibold z-10 mt-14 md:mt-0">
        Welcome {user?.firstName || "User"} to TamaHealth
      </h1>

      <p className="text-lg md:text-xl mb-6 max-w-lg text-center font-light z-10 text-blue-900">
        Discover how TamaHealth can improve your healthcare experience.
      </p>

      <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-3xl mx-auto">
        {/* Service One: Submit Prescription */}
        <button
          className="border border-white text-white px-6 py-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 z-10 hover:bg-white hover:text-blue-900"
          onClick={() => {
            window.location.href = "/submit-prescription";
          }}
        >
          Submit Your Prescription
        </button>

        {/* Service Two: Solium Treatment */}
        <button
          className="border border-white text-white px-6 py-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 z-10 hover:bg-white hover:text-blue-900"
          onClick={() => {
            window.location.href = "/solium-treatment";
          }}
        >
          Solium Treatment
        </button>
      </div>

      {/* Down Arrow to How It Works Section */}
      <div
        className="mt-8 cursor-pointer"
        onClick={() => {
          const targetSection = document.getElementById("howItWorksSection");
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
