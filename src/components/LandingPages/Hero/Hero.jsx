import React from "react";

export default function Hero() {
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
        US Prescriptions, Now Within Reach!
      </h1>

      <p className="text-lg md:text-xl mb-6 max-w-lg text-center font-light z-10 text-blue-900">
        Transforming the process of acquiring medicines in the US. No more
        overseas hassles!
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 z-10"
        onClick={() => {
          window.location.href = "/register";
        }}
      >
        Get Started
      </button>
    </div>
  );
}
