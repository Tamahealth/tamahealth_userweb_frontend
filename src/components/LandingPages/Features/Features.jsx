import React from "react";

export default function Features() {
  return (
    <div className="bg-gray-100 py-20 px-5">
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-blue-500 mb-16">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Service 1 */}
        <div className="bg-white w-full md:w-[90%] md:ml-20 h-[400px] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Replace 'icon-placeholder' with your icon component or path */}
          <div className="icon-placeholder mb-4">{/* Your Icon Here */}</div>
          <h3 className="text-2xl font-semibold text-blue-500 mb-6">
            Prescription Conversion
          </h3>
          <p className="text-gray-600">
            Convert your foreign prescriptions to US-compatible prescriptions,
            allowing you to purchase medicines at any US pharmacy seamlessly.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white w-full md:w-[90%] h-[400px] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Replace 'icon-placeholder' with your icon component or path */}
          <div className="icon-placeholder mb-4">{/* Your Icon Here */}</div>
          <h3 className="text-2xl font-semibold text-blue-500 mb-6">
            Taenia or Solium Diagnosis
          </h3>
          <p className="text-gray-600">
            Get diagnosed for Taenia or Solium with our advanced diagnostic
            methods and receive appropriate prescriptions swiftly.
          </p>
        </div>
      </div>
    </div>
  );
}
