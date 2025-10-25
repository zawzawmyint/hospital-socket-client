import React from "react";
import InformationHeader from "../generic/InformationHeader";

const PatientActiveStatus = ({ activePatient, patientCount = 0 }) => {
  return (
    <div className="space-y-3">
      <InformationHeader title={"Active status"} />
      <div className="space-y-3">
        <PatientActiveStatusBox label={"Last Update"}>
          {activePatient?.lastUpdate ? (
            <span className="text-green-600">
              {activePatient.lastUpdate.toLocaleTimeString()}
            </span>
          ) : (
            <span className="text-black/60 italic">No updates yet</span>
          )}
        </PatientActiveStatusBox>
        <PatientActiveStatusBox label={"Current Status"}>
          <span
            className={`font-medium ${
              activePatient?.isTyping
                ? "text-yellow-600"
                : activePatient?.lastUpdate
                ? "text-green-600"
                : "text-black/60 italic"
            }`}
          >
            {activePatient?.isTyping
              ? "Active - Typing"
              : activePatient?.lastUpdate
              ? "Active - Recent"
              : "Waiting for input"}
          </span>
        </PatientActiveStatusBox>
        <PatientActiveStatusBox label={"Connection Time"}>
          {activePatient?.connectedAt ? (
            <span className="text-blue-600">
              {activePatient.connectedAt.toLocaleTimeString()}
            </span>
          ) : (
            <span className="text-black/60 italic">No active patient</span>
          )}
        </PatientActiveStatusBox>
        <PatientActiveStatusBox label={"Form Submittion"}>
          {activePatient?.isSubmitted ? (
            <span className="text-purple-600">Form is submitted</span>
          ) : (
            <span className="text-black/60 italic">Not submitted yet</span>
          )}
        </PatientActiveStatusBox>
        {patientCount === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No patients connected
            </h3>
            <p className="text-gray-500">
              Waiting for patients to open the form...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientActiveStatus;

const PatientActiveStatusBox = ({ label, children }) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="p-2 bg-gray-50 rounded-lg ">{children}</div>
    </>
  );
};
