import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientSocket, setClientSocket] = useState(null);
  const [adminSocket, setAdminSocket] = useState(null);

  /**
   * Performs the logtout with the server. Updates isAutenticated.
   */
  const logout = useCallback(async () => {
    if (adminSocket) {
      adminSocket.disconnect();
    }
    if (clientSocket) {
      clientSocket.disconnect();
    }
    await axios.post("http://localhost:3001/logout");
    setIsAuthenticated(false);
  }, [adminSocket, clientSocket]);

  /**
   * Tries to perform the login. Updated isAuthenticated state accordingly.
   * @param {string} username
   * @param {string} password
   */
  const login = useCallback(async (username, password) => {
    try {
      await axios.post("http://localhost:3001/login", {
        user_name: username,
        password: password,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  // Check for socket listeners
  useEffect(() => {
    // Admin socket listeners
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

    if (clientSocket) {
      console.log("test");

      clientSocket.emit("eventos", (eventos) => {
        if (eventos) {
          console.log(eventos);
        } else {
          console.log("error getting eventos");
        }
      });
    }

    if (!clientSocket) {
      setClientSocket(io("http://localhost:3001/"));
    }

    return () => {
      if (clientSocket) {
        clientSocket.disconnect();
      }
      if (adminSocket) {
        adminSocket.disconnect();
      }
    };
  }, [clientSocket, adminSocket]);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      clientSocket,
      adminSocket,
    }),
    [login, logout, isAuthenticated, clientSocket, adminSocket]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
