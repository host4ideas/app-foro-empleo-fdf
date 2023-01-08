import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Sala from "../components/Sala";
import { FaSignOutAlt, FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import { useAuthContext } from "../contexts/authContext";
import "./table.css";
import "./detallesEvento.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { LOGIN, PUBLIC } from "../utils/paths";

export default function DetallesEvento() {
    const { logout } = useAuthContext();
    const { isAuthenticated, adminSocket } = useAuthContext();
    const [salas, setSalas] = useState([]);
    const [timerEventos, setTimerEventos] = useState([]);

    let { idevento } = useParams();

    function filtraTimer(arrayTiemposEvento) {
        var arrayIdTimers = [];
        var arrayDatos = [];

        for (var i = 0; i < arrayTiemposEvento.length; i++) {
            if (idevento == arrayTiemposEvento[i].idEvento) {
                /* console.log(arrayTiemposEvento[i].idTimer) */
                if (!arrayIdTimers.includes(arrayTiemposEvento[i].idTimer)) {
                    arrayIdTimers.push(arrayTiemposEvento[i].idTimer);
                    arrayDatos.push({
                        horaInicio: new Date(arrayTiemposEvento[i].inicioTimer),
                        categoria: arrayTiemposEvento[i].categoria,
                        duracion: arrayTiemposEvento[i].duracion,
                    });
                }
            }
        }

        arrayDatos.sort((a, b) => a.horaInicio - b.horaInicio);
        setTimerEventos(arrayDatos);
    }

    function cambiaActivo(indice) {
        var filaTimers = document.getElementsByClassName("row-time");
        for (var i = 0; i < filaTimers.length; i++) {
            if (filaTimers[i].classList.contains("time-" + indice)) {
                filaTimers[i].classList.add("working");
            } else {
                filaTimers[i].classList.remove("working");
            }
        }
    }

    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("salas", (salas) => {
                if (salas) {
                    setSalas(salas);
                } else {
                    console.log("error getting salas");
                }
            });
            adminSocket.emit("timereventos", (tEventos) => {
                if (tEventos) {
                    filtraTimer(tEventos);
                } else {
                    console.log("error getting timer eventos");
                }
            });
        }
    }, [adminSocket]);

    return (
        <div className="container text-center">
            <div className="d-flex justify-content-between">
                <div>
                    <div className="icon-container principal">
                        <Link to="/">
                            <FaArrowLeft className="icon" />
                        </Link>
                    </div>
                </div>
                {
                    //COMPROBAR SI ESTA LOGEADO
                    isAuthenticated ? (
                        <div>
                            {/* ICON LOGOUT */}
                            <div className="icon-container danger">
                                <FaSignOutAlt
                                    className="icon"
                                    onClick={() => logout()}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* ICON LOGIN */}
                            <div className="icon-container principal">
                                <Link to={"/" + PUBLIC + "/" + LOGIN}>
                                    <FaSignInAlt className="icon" />
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>

            <Timer timerev={timerEventos} metodoact={cambiaActivo} />

            <div className="table-container">
                <div className="table-header">
                    <h2>INICIO</h2>
                    <h2>CATEGORIA</h2>
                </div>
                <div className="table-body">
                    {timerEventos.map((timer, index) => {
                        return (
                            <div
                                key={index}
                                className={"table-row row-time time-" + index}
                            >
                                <h3>
                                    {timer.horaInicio
                                        .toTimeString()
                                        .substring(0, 5)}
                                </h3>
                                <h3>{timer.categoria}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="salas-container mt-4">
                {salas.map((sala, index) => {
                    return <Sala sala={sala} idevento={idevento} key={index} />;
                })}
            </div>
        </div>
    );
}
