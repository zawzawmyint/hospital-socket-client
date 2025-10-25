"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:3001";

    console.log("🔗 Connecting to socket server:", socketUrl);
    const socketInstance = io(socketUrl);

    socketInstance.on("connect", () => {
      console.log("✅ Connected to server with ID:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("💥 Connection error:", error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🧹 Cleaning up socket connection");
      socketInstance.disconnect();
    };
  }, []);

  const value = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
