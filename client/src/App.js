// React
import React from "react";
// Auth context
import AuthContextProvider from "./contexts/authContext";
// Router
import Router from "./router/Router";
// Components
import InstallPWA from "./components/InstallPWA";
// Estilos
import "./App.css";

export default function App() {
    return (
        <div className="App">
            <InstallPWA />
            <AuthContextProvider>
                <Router />
            </AuthContextProvider>
        </div>
    );
}
