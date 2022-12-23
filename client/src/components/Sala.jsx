import React from "react";
import { DETALLES_SALA } from "../utils/paths";
import { Link } from "react-router-dom";
import "./sala.css";

export default function Salas(props) {
    return (
        <Link
            className="container-sala"
            to={`/${DETALLES_SALA}/${props.nombre}`}
        >
            <span className="link-sala">{props.nombre}</span>
        </Link>
    );
}
