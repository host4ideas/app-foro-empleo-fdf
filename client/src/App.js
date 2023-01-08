// React
import React from "react";
// Contexts
import AuthContextProvider from "./contexts/authContext";
import EventoContextProvider from "./contexts/eventoContext";
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
            {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer />
            <InstallPWA />
            <AuthContextProvider>
                <EventoContextProvider>
                    <Router />
                </EventoContextProvider>
            </AuthContextProvider>
        </div>
    );
}
