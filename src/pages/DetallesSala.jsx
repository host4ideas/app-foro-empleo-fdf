import React from "react";
import { useParams } from "react-router-dom";
import Timer from "../components/Timer";

export default function DetallesSala() {
    let { idSala } = useParams();

    return (
        <div>
            <h1>ID Sala: {idSala}</h1>
            <Timer />
        </div>
    );
}
