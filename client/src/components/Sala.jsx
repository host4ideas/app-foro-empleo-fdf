import React from "react";
import { DETALLES_SALA } from "../utils/paths";
import { Link } from "react-router-dom";
import "./sala.css";

export default function Salas(props) {
    
    return (
        <Link
            className="container-sala"
            to={`/${DETALLES_SALA}/${props.sala.nombreSala}/${props.idevento}/${props.sala.idSala}`}
        >
            <span className="link-sala">{props.sala.nombreSala}</span>
        </Link>
    );
}
