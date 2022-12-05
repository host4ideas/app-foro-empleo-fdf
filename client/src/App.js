// React
import React from "react";
// Auth context
import AuthContextProvider from "./contexts/authContext";
// Router
import Router from "./router/Router";
// Estilos
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>Basic Example</h1>
      <h2>David</h2>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}
