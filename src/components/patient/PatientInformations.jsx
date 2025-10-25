import React from "react";
import InformationHeader from "../generic/InformationHeader";

const PatientInformations = ({ activePatient, formFields }) => {
  return (
    <div className="space-y-3">
      <InformationHeader
        title={"Patient Information"}
        activePatient={activePatient}
      />
      {formFields.map(({ label, field }) => (
        <div key={field}>
          <PatientInformationBox
            label={label}
            field={field}
            activePatient={activePatient}
          />
        </div>
      ))}
    </div>
  );
};

export default PatientInformations;

export const PatientInformationBox = ({ label, field, activePatient }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}{" "}
        {activePatient?.typingField === field && (
          <span className="text-blue-600 text-sm">(Typing...)</span>
        )}
      </label>
      <div className="p-2 bg-gray-50 rounded-xl min-h-[44px]">
        {activePatient?.formData[field] || (
          <span className=" text-sm text-black/60 italic">Not filled yet.</span>
        )}
      </div>
    </div>
  );
};
