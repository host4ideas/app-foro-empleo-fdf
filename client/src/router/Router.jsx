import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
<<<<<<< HEAD

=======
// Layout
import MainLayout from "../layouts/MainLayout";
>>>>>>> master
// Auth Components
import PrivateRoute from "../components/auth/PrivateRoute";
import PublicRoute from "../components/auth/PublicRoute";
// Paginas
<<<<<<< HEAD
import DetallesEvento from "../pages/DetallesEvento";
import DetallesSala from "../pages/DetallesSala";
import Login from "../pages/Login";
import InsEmpresa from "../pages/InsEmpresa";
import InsSala from "../pages/InsSala";
import InsEvento from "../pages/InsEvento";
=======
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";
import DetallesSala from "../pages/DetallesSala";
import Logout from "../pages/Logout";
import Login from "../pages/Login";
import Salas from "../pages/Salas";
import InsEmpresa from "../pages/InsEmpresa";
import InsCategoria from "../pages/InsCategoria";
import InsSala from "../pages/InsSala";
import InsEvento from "../pages/InsEvento";
import InsTiempoEmpresaSala from "../pages/InsTiempoEmpresaSala";
import InsTimer from "../pages/InsTimer";
>>>>>>> master

// Paths
import {
    DETALLES_SALA,
<<<<<<< HEAD
    LOGIN,
    PUBLIC,
    PRIVATE,
    INSEMPRESA,
    INSSALAS,
    INSEVENTO,
=======
    SALAS,
    LOGIN,
    LOGOUT,
    PUBLIC,
    PRIVATE,
    INSEMPRESA,
    INSCATEGORIA,
    INSSALAS,
    INSEVENTO,
    INSTIMER,
    INSTIEMPOEMPRESASALA,
>>>>>>> master
} from "../utils/paths";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
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
=======
                {/* Apply a layout to all pages, no auth context */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
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
                        <Route path={SALAS} element={<Salas />} />
                        <Route path={INSEMPRESA} element={<InsEmpresa />} />
                        <Route path={INSCATEGORIA} element={<InsCategoria />} />
                        <Route path={INSSALAS} element={<InsSala />} />
                        <Route path={INSEVENTO} element={<InsEvento />} />
                        <Route path={INSTIMER} element={<InsTimer />} />
                        <Route
                            path={INSTIEMPOEMPRESASALA}
                            element={<InsTiempoEmpresaSala />}
                        />
                        <Route path={LOGOUT} element={<Logout />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
>>>>>>> master
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
