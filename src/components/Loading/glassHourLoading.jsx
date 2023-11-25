import React from "react";
import "./glassHourLoading.css";

const GlassHourLoading = () => {
  return (
    <div className="glass-container">
      <div className="half"></div>
      <div className="half"></div>
      <p className="loading-text">Uploading, please wait...</p>
    </div>
  );
};

export default GlassHourLoading;
