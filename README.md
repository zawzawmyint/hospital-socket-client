# Hospital Patient Input & Staff View System

## 🚀 Overview

This project implements a responsive, real-time system with two main interfaces: a **Patient Input Form** and a **Staff View**. The core requirement is to synchronize data in real-time between the two views, allowing staff to monitor patient input immediately as it happens.

This application was developed as a candidate assignment for Agnos.

---

## 🛠️ Technologies

The application is built using the specified tech stack:

- **Framework:** Next.js
- **Styling:** TailwindCSS
- **Real-Time Communication:** Socket.io client
- **Hosting:** Vercel

---

## ✨ Features

### Patient Form

- **Data Collection:** Collects comprehensive patient details including personal information, contact, and optional fields like Middle Name, Emergency Contact, and Religion.
- **Form Validation:** Includes validation for required fields and email format.
- **Responsiveness:** Fully functional on both mobile and desktop devices.

### Staff View

- **Real-Time Monitoring:** Displays all fields from the patient form and updates instantly as the patient types or makes changes.
- **Status Indicators:** Shows the current status of the patient's interaction: **Submitted**, **Actively Filling In** and **Last Updated**.
- **Responsiveness:** Designed to adapt and function well across various staff screen sizes.

### Real-Time Synchronization

- Uses **Socket.io** for instant data synchronization between the patient and staff interfaces.
  Based on the Agnos Candidate Assignment for a Front-end developer, here is a concise README file for the project.

---

# Hospital Patient Input & Staff View System

## 🚀 Overview

This project implements a responsive, real-time system with two main interfaces: a **Patient Input Form** and a **Staff View**. The core requirement is to synchronize data in real-time between the two views, allowing staff to monitor patient input immediately as it happens.

This application was developed as a candidate assignment for Agnos.

---

## 🛠️ Technologies

The application is built using the specified tech stack:

- **Framework:** Next.js
- **Styling:** TailwindCSS
- **Real-Time Communication:** WebSockets (or a suitable alternative)
- **Hosting:** Vercel (or similar)

---

## ✨ Features

### Patient Form

- **Data Collection:** Collects comprehensive patient details including personal information, contact, and optional fields like Middle Name, Emergency Contact, and Religion.
- **Form Validation:** Includes validation for required fields, phone number format, and email format.
- **Responsiveness:** Fully functional on both mobile and desktop devices.

### Staff View

- **Real-Time Monitoring:** Displays all fields from the patient form and updates instantly as the patient types or makes changes.
- **Status Indicators:** Shows the current status of the patient's interaction: **Submitted**, **Actively Filling In**, or **Inactive**.
- **Responsiveness:** Designed to adapt and function well across various staff screen sizes.

### Real-Time Synchronization

- Uses **WebSockets** for instant data synchronization between the patient and staff interfaces.

---

## 💻 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- A package manager (npm, yarn, or pnpm)

### Set up Environment Variables

Create a file named `.env` in the root directory and add the URL for your real-time server

NEXT_PUBLIC_SOCKET_SERVER_URL="http://localhost:3001/"

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zawzawmyint/hospital-socket-client.git
   cd hospital-socket-client
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Build the project for production**:
   ```bash
   npm run build
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 Development Planning Summary

This section provides a high-level overview of the architectural decisions.

Project Structure (Folder/File Structure)

The project follows the standard Next.js App Router structure:

- `src/app/patient/page.jsx`: Contains the page and components for the Patient Form interface.
- `src/app/page.jsx`: Contains the page and components for the Staff View interface.
- `src/components/`: Reusable UI components for both Patinet Form and Staff View.
- `src/lib/context`: Utility functions and configuration (SocketContext.js for socket.io setup).
- `src/app/globals.css`: Tailwind CSS configuration and globals.

Real-Time Synchronization Flow

1.  **Connection:** Both the Patient Form and Staff View establish a WebSocket connection to the server upon loading.
2.  **Patient Input:** As a patient fills out a field in the `PatientForm`, a debounced function sends an update event to the server . The server also receives status updates .
3.  **Server Broadcast:** The WebSocket server receives the update and immediately broadcasts the latest patient data and status to all connected Staff View clients.
4.  **Staff View Update:** The `StaffView` listens for the broadcast event, updates its local state with the new data, and re-renders the displayed fields, achieving instant synchronization

## 🌐 Deployed Application

The live application can be accessed here:

https://hospital-socket-client.vercel.app

## Social backend repository

Open [https://github.com/zawzawmyint/hospital-socket-server](https://github.com/zawzawmyint/hospital-socket-server)
