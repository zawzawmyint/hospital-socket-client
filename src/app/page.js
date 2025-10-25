"use client";
import ActivePatients from "@/components/patient/ActivePatients";
import InformationHeader from "@/components/generic/InformationHeader";
import PageHeader from "@/components/generic/PageHeader";
import PatientActiveStatus from "@/components/patient/PatientActiveStatus";
import PatientInformations from "@/components/patient/PatientInformations";
import Container from "@/components/global/Container";
import { useSocket } from "@/lib/context/SocketContext";
import { useEffect, useState } from "react";

export default function Page() {
  const { socket, isConnected } = useSocket();
  const [patients, setPatients] = useState({});
  const [activePatientId, setActivePatientId] = useState(null);

  const formFields = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Middle Name", field: "middleName" },
    { label: "Date of Birth", field: "dateOfBirth" },
    { label: "Gender", field: "gender" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Email", field: "email" },
    { label: "Address", field: "address" },
    { label: "Preferred Language", field: "preferredLanguage" },
    { label: "Nationality", field: "nationality" },
    { label: "Emergency Name", field: "emname" },
    { label: "Emergency Relationship", field: "emrelationship" },
    { label: "Religion", field: "religion" },
  ];

  useEffect(() => {
    if (!socket) return;

    // Identify as staff when connected
    //  socket.emit("staff_connected");

    const handleFormUpdate = (data) => {
      setPatients((prev) => ({
        ...prev,
        [data.patientId]: {
          ...prev[data.patientId],
          formData: {
            ...prev[data.patientId]?.formData,
            [data.field]: data.value,
          },
          lastUpdate: new Date(),
          isTyping: false,
          isSubmitted: false,
        },
      }));
      setActivePatientId(data.patientId);
    };

    const handlePatientConnected = (data) => {
      setPatients((prev) => ({
        ...prev,
        [data.patientId]: {
          formData: {},
          lastUpdate: null,
          isTyping: false,
          connectedAt: new Date(data.connectedAt),
          isSubmitted: false,
        },
      }));
      setActivePatientId(data.patientId);
      console.log("New patient connected:", data.patientId);
    };

    const handlePatientDisconnected = (data) => {
      setPatients((prev) => {
        const updated = { ...prev };
        delete updated[data.patientId];
        return updated;
      });
      console.log("Patient disconnected:", data.patientId);
    };

    const handlePatientTyping = (data) => {
      setPatients((prev) => ({
        ...prev,
        [data.patientId]: {
          ...prev[data.patientId],
          isTyping: data.isTyping,
          typingField: data.isTyping ? data.field : undefined,
          isSubmitted: false,
        },
      }));
      setActivePatientId(data.patientId);
    };

    const handleFormSubmitted = (data) => {
      setPatients((prev) => ({
        ...prev,
        [data.patientId]: {
          ...prev[data.patientId],
          formData: data.formData,
          lastUpdate: new Date(data.submittedAt),
          isTyping: false,
          isSubmitted: true,
        },
      }));
      console.log("Form submitted by patient:", data.patientId);
    };

    // Register event listeners
    socket.on("form_updated", handleFormUpdate);
    socket.on("patient_connected", handlePatientConnected);
    socket.on("patient_disconnected", handlePatientDisconnected);
    socket.on("patient_typing", handlePatientTyping);
    socket.on("form_submitted", handleFormSubmitted);

    return () => {
      // Cleanup event listeners
      socket.off("form_updated", handleFormUpdate);
      socket.off("patient_connected", handlePatientConnected);
      socket.off("patient_disconnected", handlePatientDisconnected);
      socket.off("patient_typing", handlePatientTyping);
      socket.off("form_submitted", handleFormSubmitted);
    };
  }, [socket]);

  const activePatient = activePatientId ? patients[activePatientId] : null;
  const patientCount = Object.keys(patients).length;

  return (
    <Container>
      <PageHeader
        title={"Staff View Dashboard"}
        description={"Real-time patient form monitoring"}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {isConnected ? "Network Connected" : "Disconnected"}
          </span>
          <div
            className={`bg-blue-100 ${
              patientCount ? "text-blue-800" : "text-blue-800/50"
            } px-3 py-1 rounded-full text-sm font-medium`}
          >
            Patients Joined: {patientCount}
          </div>
        </div>
      </PageHeader>

      {patientCount > 0 && (
        <ActivePatients
          patients={patients}
          setActivePatientId={setActivePatientId}
          activePatientId={activePatientId}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PatientInformations
          activePatient={activePatient}
          formFields={formFields}
        />
        <PatientActiveStatus
          activePatient={activePatient}
          patientCount={patientCount}
        />
      </div>
    </Container>
  );
}
