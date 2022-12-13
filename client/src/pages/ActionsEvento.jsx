import React, { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { FaSignInAlt, FaPlus, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./actionsevento.css";
import { DETALLES_EVENTO, INSEVENTO, LOGIN, PUBLIC } from "../utils/paths";

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
    ];
    const [eventos, setEventos] = useState(eventosLocales);
    const [evento, setEvento] = useState("");
    const { isAuthenticated } = useAuthContext();
    // const [isAuthenticated, setIsAuthenticated] = useState(true);

    const selectEvento = (e) => {
        setEvento(e.target.value);
    };

    return (
        <div className="container-event">
            {eventos.length === 0 && (
                <div>
                    <div className="container-text">
                        <h5>Aún no hay eventos</h5>
                    </div>

                    {isAuthenticated ? (
                        <div className="card-event bottom">
                            <h1>Comience un nuevo evento</h1>
                            <Link
                                to={INSEVENTO}
                                className="icon-container blue"
                            >
                                <FaPlus className="icon" />
                            </Link>
                        </div>
                    ) : (
                        <div className="card-event bottom">
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
            )}
            <div>
                {eventos.map((event) => {
                    return (
                        <div className="card-event" key={event.idEvento}>
                            <div className="card-title">
                                <h3>{event.nombreEvento}</h3>
                                <p>{event.inicioEvento}</p>
                            </div>
                            <div className="card-times">
                                <h3>
                                    {/* {event.inicioEvento} - {event.finEvento} */}
                                    9:00 - 14:30
                                </h3>
                            </div>
                            <div className="card-actions">
                                <div className="">
                                    <input
                                        type="checkbox"
                                        value={event.idEvento}
                                        id={"Evento" + event.idEvento}
                                        // checked={
                                        //     evento === event.idEvento
                                        //         ? true
                                        //         : false
                                        // }

                                        onChange={selectEvento}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="card-event bottom">
                    {!evento ? (
                        <h1>Seleccione un evento</h1>
                    ) : (
                        <h1>Evento seleccionado {evento}</h1>
                    )}

                    <Link
                        to={`${DETALLES_EVENTO}/1`}
                        className="icon-container blue"
                    >
                        <FaSignInAlt className="icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
