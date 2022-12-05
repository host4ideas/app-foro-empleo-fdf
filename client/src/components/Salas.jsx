import React from "react";
import { DETALLES_SALA, PRIVATE } from "../utils/paths";
import { Link } from "react-router-dom";

export default function Salas() {
    return (
        <div>
            <h1>Salas</h1>
            <nav className="menu">
                <Link to={`/${PRIVATE + "/" + DETALLES_SALA}/1`}>
                    Detalles sala 1
                </Link>
                <Link to={`/${PRIVATE + "/" + DETALLES_SALA}/2`}>
                    Detalles sala 2
                </Link>
                <Link to={`/${PRIVATE + "/" + DETALLES_SALA}/3`}>
                    Detalles sala 3
                </Link>
                <Link to={`/${PRIVATE + "/" + DETALLES_SALA}/4`}>
                    Detalles sala 4
                </Link>
            </nav>
        </div>
    );
}
