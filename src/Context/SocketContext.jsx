import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext(null);

// Custom hook to use the Socket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the socket server
        const socketIo = io("http://localhost:4000");

        // Save the socket instance
        setSocket(socketIo);

        // Cleanup on component unmount
        return () => {
            socketIo.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
