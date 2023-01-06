import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import { FaArrowLeft } from "react-icons/fa";
import { useAuthContext } from "../contexts/authContext";
import { useEventoContext } from "../contexts/eventoContext";
import { msToMinutesSecondsAndHours } from "../utils/utils";
import { useEffect } from "react";
import "./detallesEvento.css";

export default function DetallesSala() {
    let { nombre, idevento, idsala } = useParams();
    const navigate = useNavigate();
    const { adminSocket } = useAuthContext();
    const { evento } = useEventoContext();
    const [timers, setTimers] = useState([]);

    function filtraTimer(arrayTiemposEvento) {

        var arrayDatos = []

        for (var i=0; i < arrayTiemposEvento.length; i++) {
            
            if (idevento == arrayTiemposEvento[i].idEvento) {

                arrayDatos.push({"horaInicio":new Date(arrayTiemposEvento[i].inicioTimer),"categoria":arrayTiemposEvento[i].categoria,"empresa":arrayTiemposEvento[i].empresa,"duracion":arrayTiemposEvento[i].duracion})
            }

        }

        arrayDatos.sort((a,b) => a.horaInicio - b.horaInicio)
        setTimers(arrayDatos)
    }

    function cambiaActivo(indice) {
        var filaTimers = document.getElementsByClassName("row-time")
        for (var i=0; i < filaTimers.length; i++){
            if (filaTimers[i].classList.contains("time-"+indice)){
                filaTimers[i].classList.add("working")
            }else{
                filaTimers[i].classList.remove("working")
            }
        }
    }

    useEffect(() => {
        adminSocket.emit("get timereventos sala",idsala,(tEventos) => {
            if (tEventos) {
                console.log(tEventos)
                filtraTimer(tEventos)
            }else{
                console.log("error getting timer eventos")
            }
        })
    }, [adminSocket, evento]);

    return (
        <div className="container text-center">
            <div className="d-flex flex-row ">
                <div>
                    {/* ICON LOGOUT */}
                    <div className="icon-container principal">
                        <FaArrowLeft
                            className="icon"
                            onClick={() =>
                                navigate("/detalles-evento/" + idevento)
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>{nombre}</h1>
            </div>
            <Timer timerev={timers} metodoact={cambiaActivo}/>
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
                                } row-time time-${index}`}
                                key={index}
                            >
                                <h3>{timer.horaInicio.toTimeString().substring(0,5)}</h3>
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
