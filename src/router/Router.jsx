import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// Layout
import MainLayout from "../layouts/MainLayout";
// Auth Components
import PrivateRoute from "../components/auth/PrivateRoute";
import PublicRoute from "../components/auth/PublicRoute";
// Paginas
import DetallesEvento from "../pages/DetallesEvento";
import DetallesSala from "../pages/DetallesSala";
import Login from "../pages/Login";
import InsEmpresa from "../pages/InsEmpresa";
import InsSala from "../pages/InsSala";
import InsEvento from "../pages/InsEvento";

// Paths
import {
    DETALLES_SALA,
    LOGIN,
    PUBLIC,
    PRIVATE,
    INSEMPRESA,
    INSSALAS,
    INSEVENTO,
} from "../utils/paths";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Apply a layout to all pages, no auth context */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<DetallesEvento />} />
                    {/* If users are logged will be redirected to a private route */}
                    <Route path={PUBLIC} element={<PublicRoute />}>
                        <Route path={LOGIN} element={<Login />} />
                    </Route>
                    {/* Only for logged users, if not redirected to login */}
                    <Route path={PRIVATE} element={<PrivateRoute />}>
                        <Route
                            path={`${DETALLES_SALA}/:idSala`}
                            element={<DetallesSala />}
                        />
                        <Route path={INSEMPRESA} element={<InsEmpresa />} />

                        <Route path={INSSALAS} element={<InsSala />} />
                        <Route path={INSEVENTO} element={<InsEvento />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
