import React from "react";
import { Outlet } from "react-router-dom";

const SimpleInsertLayout = (props) => {
    return (
        <>
            <header>
                <button onclick={props.close}>Close</button>
                <button onclick={props.add}>Add</button>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default SimpleInsertLayout;
