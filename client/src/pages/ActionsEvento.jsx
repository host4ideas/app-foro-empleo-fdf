import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import { FaSignInAlt, FaPlus, FaEdit, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { msToMinutesSecondsAndHours } from "../utils/utils";
import titleEmpleaTech from "../assets/images/logo-empleatech-title.svg";
// Context
import { useEventoContext } from "../contexts/eventoContext";

import "./actionsevento.css";
import {
    DETALLES_EVENTO,
    INSEVENTO,
    LOGIN,
    PUBLIC,
    PRIVATE,
} from "../utils/paths";

export default function ActionsEvento() {
    const [eventos, setEventos] = useState([]);
    const { isAuthenticated, adminSocket } = useAuthContext();
    const { changeEvento, evento } = useEventoContext();

    //SOCKET GET EVENTOS
    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("eventos", (eventos) => {
                if (eventos) {
                    setEventos(eventos);
                } else {
                    console.log("error getting eventos");
                }
            });
        }
    }, [adminSocket]);

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
                <div className="container-logo">
                    <img src={titleEmpleaTech} alt="EmpleaTech" />
                </div>

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
                            <h1>Inicie sesión para crear un evento</h1>
                            <Link
                                to={PUBLIC + "/" + LOGIN}
                                className="icon-container"
                                style={{
                                    backgroundColor: "var(--primary-color)",
                                }}
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
                <div className="container-logo">
                    <img src={titleEmpleaTech} alt="EmpleaTech" />
                </div>
                <div className="container-events mt-3">
                    {eventos.map((event) => {
                        return (
                            <div
                                className={`card-event ${
                                    evento.nombreEvento === event.nombreEvento
                                        ? "active"
                                        : ""
                                }`}
                                key={event.idEvento}
                                onClick={() => {
                                    changeEvento(event);
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
                                <span className="fst-italic">
                                    {evento.nombreEvento}
                                </span>
                            </h1>
                            <Link
                                // to={`${DETALLES_EVENTO}/${evento.nombreEvento.replace(
                                //     / /g,
                                //     ""
                                // )}`}
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
