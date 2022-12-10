import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
//Layout
import GlobalLayout from "../layouts/GlobalLayout";

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
            </Routes>
        </BrowserRouter>
    );
}
