import React, { useState, useEffect } from "react";
import "./timer.css";
import { FaPause, FaPlay, FaTimes, FaCog } from "react-icons/fa";
// import { useSocketContext } from "../contexts/socketContext";
import { useAuthContext } from "../contexts/authContext";
import io from "socket.io-client";

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [actualTime, setActualTime] = useState("");
    const [play, setPlay] = useState(false);
    const [socketAdmin, setSocketAdmin] = useState();

    // const { clientSocket, adminSocket } = useSocketContext();
    const { isAuthenticated } = useAuthContext();

    // if (clientSocket) {
    //     clientSocket.on("play timer", function (timer) {
    //         setTimer(timer);
    //     });
    // }

    //INICIO DE LA HORA ACTUAL (cada 1s se actualiza)
    useEffect(() => {
        const timeActual = window.setInterval(() => {
            showTime();
        }, 1000);
        return () => {
            // Return callback to run on unmount.
            window.clearInterval(timeActual);
        };
    }, []);

    const startTimer = () => {
        const socket = io("/admin");
        setSocketAdmin(socket);

        socket.on("connect", () => {
            console.log("admin connection");
            socket.emit("whoami", (user) => {
                console.log("admin whoami");
                console.log(user);
            });
        });

        setPlay(true);
    };
    const pauseTimer = () => {
        socketAdmin.emit("whoami", (user) => {
            console.log("admin whoami");
            console.log(user);
        });
        setPlay(false);
    };

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
