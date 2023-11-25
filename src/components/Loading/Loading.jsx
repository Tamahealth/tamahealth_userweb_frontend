// Loading.jsx
import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
