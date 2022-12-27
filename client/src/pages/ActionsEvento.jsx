import React, { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { FaSignInAlt, FaPlus, FaEdit, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { msToMinutesSecondsAndHours } from "../utils/utils";

import "./actionsevento.css";
import {
    DETALLES_EVENTO,
    INSEVENTO,
    LOGIN,
    PUBLIC,
    PRIVATE,
} from "../utils/paths";
import { useEffect } from "react";

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
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState("");
    const { isAuthenticated, clientSocket } = useAuthContext();

    //SOCKET GET EVENTOS
    useEffect(() => {
        if (clientSocket) {
            clientSocket.emit("eventos", (eventos) => {
                setEventos(eventos);
            });
        }
    }, [clientSocket]);

    const selectEvento = (nombre) => {
        setEvento(nombre);
    };

    const parseFechaToMinutesAndHours = (fecha) => {
        var fechaparse = Date.parse(fecha);
        const mh = msToMinutesSecondsAndHours(fechaparse, "hh:mm");
        return mh;
    };

    const parseFechaToFormatDMY = (fecha) => {
        var miliseconds = Date.parse(fecha);
        var date = new Date(miliseconds);

        const opciones = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        var parse = date.toLocaleDateString("es-ES", opciones);

        return parse;
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
                                    {/* <p>Mie 18, ene 2023</p> */}
                                    <p>
                                        {parseFechaToFormatDMY(
                                            event.inicioEvento
                                        )}
                                    </p>
                                </div>
                                <div className="card-times">
                                    <h1>
                                        {parseFechaToMinutesAndHours(
                                            event.inicioEvento
                                        ) +
                                            " - " +
                                            parseFechaToMinutesAndHours(
                                                event.finEvento
                                            )}
                                    </h1>
                                </div>
                                {isAuthenticated && (
                                    <div className="card-action">
                                        <Link
                                            to={"/" + PRIVATE + "/" + INSEVENTO}
                                        >
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
