import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
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

import DemoPushNotification from "../pages/DemoPushNotification";

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
                <Route index element={<DetallesEvento />} />
                <Route
                    path={`${DETALLES_SALA}/:idSala`}
                    element={<DetallesSala />}
                />
                <Route
                    path="notification-test"
                    element={<DemoPushNotification />}
                />
                {/* If users are logged will be redirected to a private route */}
                <Route path={PUBLIC} element={<PublicRoute />}>
                    <Route path={LOGIN} element={<Login />} />
                </Route>
                {/* Only for logged users, if not redirected to login */}
                <Route path={PRIVATE} element={<PrivateRoute />}>
                    <Route path={INSEMPRESA} element={<InsEmpresa />} />
                    <Route path={INSSALAS} element={<InsSala />} />
                    <Route path={INSEVENTO} element={<InsEvento />} />
                </Route>
                {/* Redirect for 404 Error */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
