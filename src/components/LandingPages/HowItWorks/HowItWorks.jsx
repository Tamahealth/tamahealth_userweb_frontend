import React from "react";
import {
  DocumentAddIcon,
  EyeIcon,
  RefreshIcon,
  ClipboardCheckIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
} from "@heroicons/react/outline";

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-20 px-6 md:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-blue-500 mb-16">
        How It Works
      </h2>

      {/* Prescription Conversion Steps */}
      <div className="mb-12">
        <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-8">
          Prescription Conversion
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8 bg-white p-6 rounded-lg shadow-md">
          <Step
            icon={<DocumentAddIcon />}
            title="Register"
            description="Start by registering on our platform. Quick and hassle-free!"
          />
          <Divider />
          <Step
            icon={<EyeIcon />}
            title="Submit Foreign Prescription"
            description="Upload your prescription and our experts will review it."
          />
          <Divider />
          <Step
            icon={<RefreshIcon />}
            title="Get US-Compatible Prescription"
            description="Once approved, you'll receive a US-compatible prescription."
          />
          <Divider />
          <Step
            icon={<CheckIcon />}
            title="Buy Medicines in US Pharmacies"
            description="With your prescription, buy medicines at any US pharmacy."
          />
        </div>
      </div>

      {/* Taenia/Solium Diagnosis Steps */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-8">
          Taenia/Solium Diagnosis
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8 bg-white p-6 rounded-lg shadow-md">
          <Step
            icon={<QuestionMarkCircleIcon />}
            title="Need a Solium diagnosis?"
            description="We offer rapid tests online."
          />
          <Divider />
          <Step
            icon={<QuestionMarkCircleIcon />}
            title="Answer Questions"
            description="Answer a few important questions regarding your health."
          />
          <Divider />
          <Step
            icon={<ClipboardCheckIcon />}
            title="Get Diagnosis"
            description="Our experts will diagnose and offer the best advice."
          />
          <Divider />
          <Step
            icon={<TruckIcon />}
            title="Receive Medicine or Prescription"
            description="We'll ship your medicine or prescription directly to you."
          />
        </div>
      </div>
    </div>
  );
}

const Step = ({ icon, title, description }) => (
  <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0 md:w-1/4 text-center md:text-left">
    <div className="h-10 w-10 text-blue-500 mb-4 md:mb-0">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Divider = () => (
  <div className="hidden md:block border-l-2 border-gray-300 h-20"></div>
);
