import React from "react";
import { DETALLES_SALA } from "../utils/paths";
import { Link } from "react-router-dom";
import "./sala.css";

export default function Salas(props) {
    return (
        <div className="container-sala">
            <Link
                className="link-sala"
                to={`/${DETALLES_SALA}/${props.nombre}`}
            >
                {props.nombre}
            </Link>
        </div>
    );
}
