import React from "react";
import { Link } from "react-router-dom";
import { PRIVATE, PUBLIC, LOGIN, LOGOUT, HOME, SALAS } from "../utils/paths";

export default function Menu() {
    return (
        <nav className="menu">
            <Link to={HOME}>Home</Link>
            <Link to={"/" + PRIVATE + "/" + SALAS}>Salas</Link>
            <Link to={"/" + PUBLIC + "/" + LOGIN}>Login</Link>
            <Link to={"/" + PRIVATE + "/" + LOGOUT}>Logout</Link>
        </nav>
    );
}
