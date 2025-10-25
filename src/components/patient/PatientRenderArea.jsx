import React from "react";
import PatientInput from "./PatientInput";

const PatientRenderArea = ({
  handleInputChange,
  handleEmergencyContactChange,
  formData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full ">
      <PatientInput
        placeholder={"First Name *"}
        value={formData.firstName}
        field={"firstName"}
        handleInputChange={handleInputChange}
        required
      />
      <PatientInput
        placeholder={"Last Name *"}
        value={formData.lastName}
        field={"lastName"}
        handleInputChange={handleInputChange}
        required
      />
      <PatientInput
        placeholder={"Middle Name"}
        value={formData.middleName}
        field={"middleName"}
        handleInputChange={handleInputChange}
        className={"col-span-full"}
      />
      <PatientInput
        placeholder={"Date Of Birth"}
        value={formData.dateOfBirth}
        field={"dateOfBirth"}
        handleInputChange={handleInputChange}
        type={"date"}
      />
      <PatientInput
        placeholder={"Gender"}
        value={formData.gender}
        field={"gender"}
        handleInputChange={handleInputChange}
      />
      <PatientInput
        placeholder={"Phone Number"}
        value={formData.phoneNumber}
        field={"phoneNumber"}
        handleInputChange={handleInputChange}
      />
      <PatientInput
        placeholder={"Email"}
        value={formData.email}
        field={"email"}
        handleInputChange={handleInputChange}
        type={"email"}
        required
      />
      <textarea
        value={formData.address}
        rows="4"
        className="w-full px-3 py-2 shadow col-span-full bg-gray-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}"
        placeholder="Address"
        onChange={(e) => handleInputChange("address", e.target.value)}
      ></textarea>
      <PatientInput
        placeholder={"Preferred Language"}
        value={formData.preferredLanguage}
        field={"preferredLanguage"}
        handleInputChange={handleInputChange}
      />
      <PatientInput
        placeholder={"Nationality"}
        value={formData.nationality}
        field={"nationality"}
        handleInputChange={handleInputChange}
      />
      {/* Emergency Contact */}
      <div className="border-t border-b py-6 col-span-full">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Emergency Contact (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PatientInput
            placeholder={"Emergency contact name"}
            value={formData.emergencyContact?.emname}
            field={"emname"}
            handleInputChange={handleEmergencyContactChange}
          />
          <PatientInput
            placeholder={"Relationship"}
            value={formData.emergencyContact?.emrelationship}
            field={"emrelationship"}
            handleInputChange={handleEmergencyContactChange}
          />
        </div>
      </div>
      <PatientInput
        placeholder={"Religion"}
        value={formData.religion}
        field={"religion"}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default PatientRenderArea;
