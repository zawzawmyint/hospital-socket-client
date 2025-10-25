import React from "react";

const ActivePatients = ({ patients, activePatientId, setActivePatientId }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Active Patients
      </h3>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {Object.entries(patients).map(([patientId, patient]) => (
          <div
            key={patientId}
            onClick={() => setActivePatientId(patientId)}
            className={`px-4 py-2 rounded-xl border-2 transition-colors ${
              activePatientId === patientId
                ? "border-blue-500 bg-blue-50 text-black"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex justify-center items-center gap-3">
              <div className="font-medium text-sm">
                {patient.formData.firstName || "New"}{" "}
                {patient.formData.lastName} is
              </div>
              <div className="text-xs text-gray-500">
                {patient.isTyping
                  ? `🟢 Typing...`
                  : patient.lastUpdate
                  ? "🟡 Active"
                  : "⚪ Connected"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivePatients;
