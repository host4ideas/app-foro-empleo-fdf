import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import DetallesSala from "./pages/DetallesSala";

export default function App() {
    return (
        <div className="App">
            <h1>Basic Example</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route
                            path="detalles-sala"
                            element={<DetallesSala />}
                        />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
