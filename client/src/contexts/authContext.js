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

  const getSocketSession = () => {
    return new Promise((resolve) => {
      const socketAdmin = io("http://localhost:3001/admin");

      socketAdmin.on("connect", () => {
        // console.log("test")
        resolve(socketAdmin);
      });

      // If the socket is not connected after 1s, try again to reconnect
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  };

  /**
   * Checks if the user is logged by reaching the server, sets the isAuthenticated state
   * accordingly {true | false}.
   */
  const checkLoggedUser = useCallback(() => {
    return axios
      .get("http://localhost:3001/check-user")
      .then((response) => {
        console.log("user authenticated: " + response.data);
        // getSocketSession().then((socketAdmin) => {
        //     setAdminSocket(socketAdmin);
        //     setIsAuthenticated(response.data);
        // });
        setIsAuthenticated(response.data);
      })
      .catch((error) => {
        console.warn(error);
        setIsAuthenticated(false);
      });
  }, []);

  /**
   * Tries to perform the login. Updated isAuthenticated state accordingly.
   * @param {string} username
   * @param {string} password
   */
  const login = useCallback(async (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    setIsAuthenticated(true);

    // try {
    //     await axios.post("http://localhost:3001/login", params);
    //     let count = 0;

    //     while (count < 6) {
    //         const socketAdmin = await getSocketSession(count);
    //         if (socketAdmin) {
    //             setAdminSocket(socketAdmin);
    //             setIsAuthenticated(true);
    //             break;
    //         }
    //         if (count === 5) {
    //             throw new Error(
    //                 "Unable to connect with admin privileges. Please, try again."
    //             );
    //         }
    //         count++;
    //     }
    // } catch (error) {
    //     console.warn(error);
    // }
  }, []);

  useEffect(() => {
    checkLoggedUser();
  }, [checkLoggedUser]);

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
  }, [clientSocket, adminSocket, isAuthenticated]);

  const value = useMemo(
    () => ({
      login,
      logout,
      checkLoggedUser,
      isAuthenticated,
      clientSocket,
      adminSocket,
    }),
    [login, logout, checkLoggedUser, isAuthenticated, clientSocket, adminSocket]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
