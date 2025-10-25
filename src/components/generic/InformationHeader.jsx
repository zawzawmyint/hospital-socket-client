import React from "react";

const InformationHeader = ({ title, activePatient }) => {
  return (
    <div className="flex gap-2 items-center flex-wrap border-b pb-3">
      <h2 className="text-lg font-semibold text-gray-700 ">{title}</h2>
      {activePatient?.isTyping && (
        <div>
          <h1 className="text-blue-600 font-normal">
            (Typing {activePatient.typingField}...)
          </h1>
        </div>
      )}
    </div>
  );
};

export default InformationHeader;
