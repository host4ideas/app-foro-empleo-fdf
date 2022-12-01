import React from "react";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const MainLayout = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <header>
                {isAuthenticated ? (
                    <h2>Has iniciado sesión</h2>
                ) : (
                    <h2>NO has iniciado sesión</h2>
                )}
                <Menu />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
