// React
import React, { useState, useEffect } from "react";
import { FaPause, FaPlay, FaTimes, FaCog } from "react-icons/fa";
// Contexts
import { useAuthContext } from "../contexts/authContext";
// Timer
import timerCounter from "../lib/tiny-timer";
import { msToMinutesSecondsAndHours } from "../utils/utils";
// Styles
import "./timer.css";

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [actualTime, setActualTime] = useState("");
    const [play, setPlay] = useState(false);
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const synchronizeTimer = (time) => {
        timerCounter.stop();
        timerCounter.start(time);
    };

    // Client timer functionality
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
                setTimer(msToMinutesSecondsAndHours(time));
            });
            clientSocket.on("start timer", function (time) {
                synchronizeTimer(time);
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
    }, [clientSocket]);

    // Admin timer functionality
    const startTimer = () => {
        if (adminSocket) {
            adminSocket.emit("resume timer");
        }

        setPlay(true);
    };

    const pauseTimer = () => {
        if (adminSocket) {
            adminSocket.emit("pause timer");
        }
        setPlay(false);
    };

    timerCounter.on("tick", () =>
        setTimer(msToMinutesSecondsAndHours(timerCounter.time))
    );

    // Executed on mount
    useEffect(() => {
        // Initialize actual hour (updates every 1s)
        const timeActual = setInterval(() => {
            setActualTime(msToMinutesSecondsAndHours(new Date()));
        }, 1000);
        return () => {
            // Return callback to run on unmount.
            clearInterval(timeActual);
        };
    }, []);

    return (
        <div className="row mt-4">
            <div className={`timer ${play ? "working" : "stop"}`}>
                <div className="timer-menu">
                    <input type="checkbox" id="toggle" />
                    <label id="show-menu" htmlFor="toggle">
                        {isAuthenticated ? (
                            <>
                                <div className="btn-menu">
                                    <FaCog className="menuBtn animation" />
                                    <FaTimes className="closeBtn" />
                                </div>
                                <div className="btn-menu">
                                    <FaPlay
                                        onClick={startTimer}
                                        className="icon-menu"
                                    />
                                </div>
                                <div className="btn-menu">
                                    <FaPause
                                        onClick={pauseTimer}
                                        className="icon-menu"
                                    />
                                </div>
                            </>
                        ) : null}
                    </label>
                </div>
                <h1 className="timer-title">{timer}</h1>
            </div>
            <div className="col-md-6 offset-md-3">
                <p className="fst-italic">{actualTime}</p>
            </div>
        </div>
    );
}
