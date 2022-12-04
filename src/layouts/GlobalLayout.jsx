import React from "react";
import { Outlet } from "react-router-dom";

const GlobalLayout = (props) => {
    return (
        <>
            <header>
                {props.backbutton && <a>Go back</a>}
                {props.editbutton && <a>Go edit</a>}
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default GlobalLayout;
