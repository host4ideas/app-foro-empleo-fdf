import { createContext, useContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
// Auth context
import { useAuthContext } from "./authContext";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
    const [clientSocket, setClientSocket] = useState(null);
    const [adminSocket, setAdminSocket] = useState(null);

    const { isAuthenticated } = useAuthContext();

    // Initialize clientSocket once
    useEffect(() => {
        if (!clientSocket) {
            setClientSocket(io("/"));
        }
    }, [clientSocket]);

    useEffect(() => {
        // Initialize adminSocket if the user if authenticated
        if (isAuthenticated && !adminSocket) {
            try {
                const socketAdmin = io("/admin");
                setAdminSocket(socketAdmin);

                socketAdmin.on("connect", () => {
                    console.log("admin connection");
                    socketAdmin.emit("whoami", (user) => {
                        console.log("admin whoami");
                        console.log(user);
                    });
                });
            } catch (error) {
                console.warn(error);
            }
            // If not, disconnect the adminSocket
        } else if (!isAuthenticated && adminSocket) {
            adminSocket.disconnect();
        }
    }, [isAuthenticated, adminSocket, setAdminSocket]);

    // Check for socket listeners
    useEffect(() => {
        // Admin socket listenners
        if (adminSocket && typeof adminSocket === "object") {
            adminSocket.on("connect", () =>
                console.log("connected to admin socket: " + adminSocket.id)
            );
            adminSocket.on("disconnect", () =>
                console.warn("admin socket connection disconnected")
            );
        }
        // Client socket listenners
        if (clientSocket && typeof clientSocket === "object") {
            clientSocket.on("connect", () =>
                console.log("connected to client socket: " + clientSocket.id)
            );
            clientSocket.on("disconnect", () =>
                console.warn("client socket connection disconnected")
            );
        }
    }, [clientSocket, adminSocket]);

    const value = useMemo(
        () => ({
            clientSocket,
            adminSocket,
        }),
        [adminSocket, clientSocket]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

SocketContextProvider.propTypes = {
    children: PropTypes.object,
};

export function useSocketContext() {
    return useContext(SocketContext);
}
