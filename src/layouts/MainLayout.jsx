import React from "react";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <header>
                <Menu />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
