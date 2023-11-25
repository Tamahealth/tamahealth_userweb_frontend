import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-green-100 flex flex-col items-center justify-center transition-opacity opacity-0 payment-success-animate">
      <div className="checkmark-circle">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark-check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-green-800 mt-4">
        Payment Success!
      </h1>
      <p className="text-green-600 mt-2 text-center px-4">
        Thank you! We will handle your request shortly. Redirecting in a few
        moments...
      </p>
    </div>
  );
};

export default PaymentSuccess;
