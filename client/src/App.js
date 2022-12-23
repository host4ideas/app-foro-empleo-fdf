// React
import React from "react";
// Auth context
import AuthContextProvider from "./contexts/authContext";
// Router
import Router from "./router/Router";
// Components
import InstallPWA from "./components/InstallPWA";
import { ToastContainer, toast } from "react-toastify";
// Estilos
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    const notify = () => toast("Wow so easy!");
    return (
        <div className="App">
            <ToastContainer />
            <InstallPWA />
            <AuthContextProvider>
                <Router />
            </AuthContextProvider>
        </div>
    );
}
