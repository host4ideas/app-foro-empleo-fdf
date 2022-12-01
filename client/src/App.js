// React
import React, { Suspense } from "react";
// Auth context
import AuthContextProvider from "./contexts/authContext";
// Router
import Router from "./router/Router";
// Estilos
import "./App.css";

export default function App() {
    return (
        <div className="App">
            <AuthContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router />
                </Suspense>
            </AuthContextProvider>
        </div>
    );
}
