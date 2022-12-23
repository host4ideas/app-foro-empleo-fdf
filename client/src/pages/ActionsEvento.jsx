import React, { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { FaSignInAlt, FaPlus, FaEdit, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./actionsevento.css";
import {
    DETALLES_EVENTO,
    INSEVENTO,
    LOGIN,
    PUBLIC,
    PRIVATE,
} from "../utils/paths";

export default function ActionsEvento() {
    const eventosLocales = [
        {
            idEvento: 0,
            nombreEvento: "FORO DE EMPLEO",
            inicioEvento: "2022-12-13T17:42:17.959Z",
            finEvento: "2022-12-13T17:42:17.959Z",
        },
        {
            idEvento: 1,
            nombreEvento: "FERIA DEL MOTOR",
            inicioEvento: "2022-12-13T17:42:17.959Z",
            finEvento: "2022-12-13T17:42:17.959Z",
        },
        {
            idEvento: 2,
            nombreEvento: "TECH RIDERS",
            inicioEvento: "2022-12-13T17:42:17.959Z",
            finEvento: "2022-12-13T17:42:17.959Z",
        },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
        // {
        //     idEvento: 2,
        //     nombreEvento: "TECH RIDERS",
        //     inicioEvento: "2022-12-13T17:42:17.959Z",
        //     finEvento: "2022-12-13T17:42:17.959Z",
        // },
    ];
    const [eventos, setEventos] = useState(eventosLocales);
    const [evento, setEvento] = useState("");
    const { isAuthenticated } = useAuthContext();
    //const [isAuthenticated, setIsAuthenticated] = useState(true);

    const selectEvento = (nombre) => {
        setEvento(nombre);
    };

    const parseFecha = (fecha) => {
        var fechaparse = Date.parse(fecha);
        console.log(fechaparse);
        return fecha;
    };

    const parseFechaHoraToHora = (fechaHora) => {
        return fechaHora;
    };

    if (eventos.length === 0) {
        return (
            <div>
                <div className="container-text">
                    <h5>Aún no hay eventos</h5>
                </div>

                <div className="card-event bottom">
                    {isAuthenticated ? (
                        <div className="card-title">
                            <h1>Nuevo evento</h1>
                            <Link
                                to={PRIVATE + "/" + INSEVENTO}
                                className="icon-container blue"
                            >
                                <FaPlus className="icon" />
                            </Link>
                        </div>
                    ) : (
                        <div className="card-title">
                            <h1>Inicie sesión para crear un evento </h1>
                            <Link
                                to={PUBLIC + "/" + LOGIN}
                                className="icon-container blue"
                            >
                                <FaSignInAlt className="icon" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="container-events mt-5">
                    {eventos.map((event) => {
                        return (
                            <div
                                className={`card-event ${
                                    evento === event.nombreEvento
                                        ? "active"
                                        : ""
                                }`}
                                key={event.idEvento}
                                onClick={() => {
                                    selectEvento(event.nombreEvento);
                                }}
                            >
                                <div className="card-title">
                                    <h1>{event.nombreEvento}</h1>
                                    <p>Mie 18, ene 2023</p>
                                    {/* <p>{event.inicioEvento}</p> */}
                                </div>
                                <div className="card-times">
                                    <h1>
                                        {/* {event.inicioEvento} - {event.finEvento} */}
                                        {parseFecha(event.inicioEvento)}
                                    </h1>
                                </div>
                                {isAuthenticated && (
                                    <div className="card-action">
                                        <Link to={PRIVATE + "/" + INSEVENTO}>
                                            <FaEdit className="icon" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="card-event bottom">
                    {!evento ? (
                        <h1>Seleccione un evento</h1>
                    ) : (
                        <div className="card-title">
                            <h1>
                                Comenzar:{" "}
                                <span className="fst-italic">{evento}</span>
                            </h1>
                            <Link
                                to={`${DETALLES_EVENTO}/${evento.replace(
                                    / /g,
                                    ""
                                )}`}
                                className="icon-container blue"
                            >
                                <FaPlay className="icon" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
