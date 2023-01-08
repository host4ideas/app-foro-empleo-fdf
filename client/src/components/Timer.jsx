// React
import React, { useState, useEffect } from "react";
import { FaPause, FaPlay, FaTimes, FaCog } from "react-icons/fa";
// Contexts
import { useAuthContext } from "../contexts/authContext";
import { useEventoContext } from "../contexts/eventoContext";
// Timer
import timerCounter from "../lib/tiny-timer";
import { msToMinutesSecondsAndHours } from "../utils/utils";
// Styles
import "./timer.css";

export default function Timer(props) {

    const [timer, setTimer] = useState("00:00");
    var prueba = 0;

    const [clockTime, setClockTime] = useState("");
    const [play, setPlay] = useState(false);
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();
    const { eventoSelected, tiemposEventos } = useEventoContext();

    /* const synchronizeTimer = (time) => {
        timerCounter.stop();
        timerCounter.start(time);
    };
    // Admin timer functionality
    const startTimer = () => {
        if (adminSocket) {
            adminSocket.emit("resume timer");
        }
        // timerCounter.start(10000);
        setPlay(true);
    };
    const pauseTimer = () => {
        if (adminSocket) {
            adminSocket.emit("pause timer");
        }
        setPlay(false);
    };
    timerCounter.on("tick", () => {
        console.log("test " + timerCounter.time);
        setTimer(msToMinutesSecondsAndHours(timerCounter.time, "hh:mm:ss"));
    }); */

    const showClockTime = () => {
        var myDate = new Date();
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();
        var seconds = myDate.getSeconds();
        if (hours < 10) hours = 0 + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        setClockTime(hours + ":" + minutes + ":" + seconds);
    };

    const compruebaInicio = () => {
        if (eventoSelected.inicioEvento !== undefined) {
            var ahora = Math.trunc(
                new Date(2023, 0, 18, 8, 59, prueba).getTime() / 1000
            );
            /* var ahora = Math.trunc(new Date().getTime()/1000) */
            var inicio = Math.trunc(
                new Date(eventoSelected.inicioEvento).getTime() / 1000
            );

            if (ahora - inicio >= 0) {
                // Remove other eventos
                calculaDuracion(ahora, tiemposEventos);
            } else {
                console.log("Aun no empezo");
            }
        }
    }

    const calculaDuracion = (fechaactual, timers) => {

        var indiceTiempoEvento = 0;
        var finalizado = false;
        var duracionSeg = 0;
        while (!finalizado) {
            var timerSeleccionado = new Date(timers[indiceTiempoEvento].inicioTimer);
            if (timers.length > indiceTiempoEvento) {
                var tiempoSig = Math.trunc(
                    timerSeleccionado.getTime() / 1000 +
                        timerSeleccionado.duracion * 60
                );

                var tiempoSig = Math.trunc(timerSeleccionado.getTime()/1000 + timers[indiceTiempoEvento].duracion*60)
                
                if (fechaactual >= tiempoSig){
                    indiceTiempoEvento++;
                }else{
                    duracionSeg = (tiempoSig - fechaactual)
                    finalizado = true;
                }

                props.metodoact(indiceTiempoEvento)
            }else{
                finalizado = true;
            }
            
        }
        
        preparaTimer(duracionSeg)

    }

    const preparaTimer = (duracion) => {

        var minutos = Math.trunc(duracion/60)
        if (minutos < 10){
            minutos = "0"+minutos
        }

        var segundos = duracion % 60;
        if (segundos < 10){
            segundos = "0"+segundos
        }
        
        setTimer(minutos+":"+segundos)

    }

    //HORA ACTUAL
    useEffect(() => {
        const actualClockTime = setInterval(() => {
            showClockTime();
            compruebaInicio();
            prueba++
        }, 1000);
        return () => {
            // Return callback to run on unmount (stop clock)
            clearInterval(actualClockTime);
        };
    }, []);

    /* // Client timer functionality
    useEffect(() => {
        if (clientSocket) {
            // Initialize timer (check if the server's timer is running)
            clientSocket.emit("check timer", (time, status) => {
                if (status === "running") {
                    synchronizeTimer(time);
                }
            });
            clientSocket.on("initial time", function (time) {
                timerCounter.stop();
                setTimer(msToMinutesSecondsAndHours(time, "hh:mm:ss"));
            });
            clientSocket.on("start timer", function (time) {
                synchronizeTimer(10000);
            });
            clientSocket.on("resume timer", function (time) {
                synchronizeTimer(time);
            });
            clientSocket.on("pause timer", function () {
                timerCounter.pause();
            });
            clientSocket.on("stop timer", function () {
                timerCounter.stop();
                setTimer("00:00:00");
            });
        }
    }, [clientSocket]); */

    return (
        <div className="mt-4 ">
            <div className={`timer ${play ? "working" : "stop"}`}>
                {/* <div className="timer-menu">
                    <input
                        className="toggle-check"
                        type="checkbox"
                        id="toggle"
                    />
                    <label id="show-menu" htmlFor="toggle">
                        {isAuthenticated ? (
                            <>
                                <div className="btn-menu">
                                    <FaCog className="menuBtn animation" />
                                    <FaTimes className="closeBtn" />
                                </div>
                                <div className="btn-menu">
                                    <FaPlay className="icon-menu" />
                                </div>
                                <div className="btn-menu">
                                    <FaPause className="icon-menu" />
                                </div>
                            </>
                        ) : null}
                    </label>
                </div> */}
                <h1 className="timer-title">{timer}</h1>
            </div>
            <div className="col-md-6 offset-md-3">
                {clockTime ? (
                    <p className="fst-italic">{clockTime}</p>
                ) : (
                    <p className="fst-italic">Loading...</p>
                )}
            </div>
        </div>
    );
}