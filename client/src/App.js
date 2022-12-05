// React
<<<<<<< HEAD
import React from "react";
=======
import React, { Suspense } from "react";
>>>>>>> master
// Auth context
import AuthContextProvider from "./contexts/authContext";
// Router
import Router from "./router/Router";
// Estilos
import "./App.css";

export default function App() {
<<<<<<< HEAD
  return (
    <div className="App">
      <h1>Basic Example</h1>
      <h2>David</h2>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
=======
    return (
        <div className="App">
            <AuthContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router />
                </Suspense>
            </AuthContextProvider>
        </div>
    );
>>>>>>> master
}
