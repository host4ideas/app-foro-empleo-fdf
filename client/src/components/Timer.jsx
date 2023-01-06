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
    // Initial timer time set by the admin
    const [initialTimerTime, setInitialTimerTime] = useState(0);
    // Timer time
    const [timer, setTimer] = useState(0);
    // Clock time
    const [actualClockTime, setActualClockTime] = useState("");
    // Timer play state
    const [play, setPlay] = useState(false);
    // Auth context hook
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const synchronizeTimer = (time) => {
        timerCounter.stop();
        timerCounter.start(time);
    };

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
                setInitialTimerTime(time);
                setTimer(msToMinutesSecondsAndHours(time, "hh:mm:ss"));
            });
            clientSocket.on("start timer", function () {
                // Start the timer with the initial time
                synchronizeTimer(initialTimerTime);
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
    }, [clientSocket, initialTimerTime]);

    timerCounter.on("tick", () => {
        setTimer(msToMinutesSecondsAndHours(timerCounter.time, "hh:mm:ss"));
    });

    // HORA ACTUAL
    useEffect(() => {
        const actualClockTime = setInterval(() => {
            showClockTime();
        }, 1000);
        return () => {
            // Return callback to run on unmount (stop clock)
            clearInterval(actualClockTime);
        };
    }, []);

    const showClockTime = () => {
        let myDate = new Date();
        let hours = myDate.getHours();
        let minutes = myDate.getMinutes();
        let seconds = myDate.getSeconds();
        if (hours < 10) hours = 0 + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        setActualClockTime(hours + ":" + minutes + ":" + seconds);
    };

    return (
        <div className="row mt-4">
            <div className={`timer ${play ? "working" : "stop"}`}>
                <div className="timer-menu">
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
                                <div className="btn-menu" onClick={startTimer}>
                                    <FaPlay className="icon-menu" />
                                </div>
                                <div className="btn-menu" onClick={pauseTimer}>
                                    <FaPause className="icon-menu" />
                                </div>
                            </>
                        ) : null}
                    </label>
                </div>
                <h1 className="timer-title">{timer}</h1>
            </div>
            <div className="col-md-6 offset-md-3">
                {actualClockTime ? (
                    <p className="fst-italic">{actualClockTime}</p>
                ) : (
                    <p className="fst-italic">Loading...</p>
                )}
            </div>
        </div>
    );
}
