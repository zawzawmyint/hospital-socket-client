"use client";
import PageHeader from "@/components/generic/PageHeader";
import PatientRenderArea from "@/components/patient/PatientRenderArea";
import Container from "@/components/global/Container";
import { useSocket } from "@/lib/context/SocketContext";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const { socket, isConnected } = useSocket();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredLanguage: "",
    nationality: "",
    emergencyContact: {
      emname: "",
      emrelationship: "",
    },
    religion: "",
  });

  const [typingTimeouts, setTypingTimeouts] = useState({});

  useEffect(() => {
    if (socket && isConnected) {
      socket.emit("patient_connected", {
        connectedAt: new Date().toISOString(),
      });
    }
  }, [socket, isConnected]);

  const emitUpdate = debounce((field, value) => {
    if (socket && isConnected) {
      const updateData = {
        field,
        value,
        timestamp: new Date().toISOString(),
      };
      socket.emit("form_update", updateData);
    }
  }, 1000);

  const handleInputChange = (field, value) => {
    // Update local state
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // real time emit update
    emitUpdate(field, value);

    // Handle typing indicators
    if (socket && isConnected) {
      // Clear existing timeout for this field
      if (typingTimeouts[field]) {
        clearTimeout(typingTimeouts[field]);
      }

      // Start typing
      socket.emit("typing_start", field);

      // Set timeout to stop typing
      const timeout = setTimeout(() => {
        socket.emit("typing_stop", field);
      }, 1000);

      // Store timeout reference
      setTypingTimeouts((prev) => ({
        ...prev,
        [field]: timeout,
      }));
    }
  };

  const handleEmergencyContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }));
    // real time emit update
    emitUpdate(field, value);

    // Handle typing indicators
    if (socket && isConnected) {
      // Clear existing timeout for this field
      if (typingTimeouts[field]) {
        clearTimeout(typingTimeouts[field]);
      }

      // Start typing
      socket.emit("typing_start", field);

      // Set timeout to stop typing
      const timeout = setTimeout(() => {
        socket.emit("typing_stop", field);
      }, 1000);

      // Store timeout reference
      setTypingTimeouts((prev) => ({
        ...prev,
        [field]: timeout,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket && isConnected) {
      socket.emit("form_submitted", {
        ...formData,
        ...formData.emergencyContact,
      });
      alert("Form submitted successfully!");
    }
  };
  return (
    <Container maxWidth="max-w-3xl">
      <PageHeader
        title={"Patient Information Form 🤒"}
        description={"Please fill your information."}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <PatientRenderArea
          handleInputChange={handleInputChange}
          handleEmergencyContactChange={handleEmergencyContactChange}
          formData={formData}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Form
        </button>
      </form>
    </Container>
  );
}
