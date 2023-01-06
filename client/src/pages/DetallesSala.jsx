import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import { FaArrowLeft } from "react-icons/fa";
import { useAuthContext } from "../contexts/authContext";
import { useEventoContext } from "../contexts/eventoContext";
import { msToMinutesSecondsAndHours } from "../utils/utils";
import { useEffect } from "react";

export default function DetallesSala() {
    let { nombre, nombreEvento } = useParams();
    const navigate = useNavigate();
    const { adminSocket } = useAuthContext();
    const { evento } = useEventoContext();
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        if (adminSocket && evento) {
            adminSocket.emit("get timers", (timers) => {
                if (timers) {
                    setTimers(timers);
                }
            });
        }
    }, [adminSocket, evento]);

    return (
        <div className="container text-center">
            <div className="d-flex flex-row ">
                <div>
                    {/* ICON BACK */}
                    <div className="icon-container principal">
                        <FaArrowLeft
                            className="icon"
                            onClick={() =>
                                navigate("/detalles-evento/" + nombreEvento)
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>{nombre}</h1>
            </div>
            <Timer />
            <div className="table-container">
                <div className="table-header">
                    <h2>INICIO</h2>
                    <h2>CATEGORIA</h2>
                    <h2>EMPRESA</h2>
                </div>
                <div className="table-body details">
                    {timers.map((timer, index) => {
                        return (
                            <div
                                className={`table-row ${
                                    new Date(timer.inicio) >= new Date() &&
                                    new Date(timer.inicio) <
                                        new Date() + timer.duracion * 60 * 1000
                                        ? "working"
                                        : null
                                }`}
                                key={index}
                            >
                                <h3>
                                    {msToMinutesSecondsAndHours(
                                        timer.duracion * 60 * 1000,
                                        "hh:mm"
                                    )}
                                </h3>
                                <h3>{timer.categoria}</h3>
                                <h3>{timer.empresa}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
