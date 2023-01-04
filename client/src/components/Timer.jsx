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
    }, [clientSocket]);

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
    });

    //HORA ACTUAL
    useEffect(() => {
        const timer = setInterval(() => {
            const timeActual = setInterval(() => {
                showTime();
            }, 1000);
            return () => {
                // Return callback to run on unmount.
                clearInterval(timer);
                clearInterval(timeActual);
            };
        });
    }, []);

    const showTime = () => {
        var myDate = new Date();
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();
        var seconds = myDate.getSeconds();
        if (hours < 10) hours = 0 + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        setActualTime(hours + ":" + minutes + ":" + seconds);
    };

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
                                <div className="btn-menu" onClick={startTimer}>
                                    <FaPlay className="icon-menu" />
                                </div>
                                <div className="btn-menu" onClick={pauseTimer}>
                                    <FaPause className="icon-menu" />
                                </div>
                            </>
                        ) : null}
                    </label>
                </div> */}
                <h1 className="timer-title">{timer}</h1>
            </div>
            <div className="col-md-6 offset-md-3">
                {actualTime ? (
                    <p className="fst-italic">{actualTime}</p>
                ) : (
                    <p className="fst-italic">Loading...</p>
                )}
            </div>
        </div>
    );
}
