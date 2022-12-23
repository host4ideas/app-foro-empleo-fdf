import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./timer.css";
import { FaPause, FaPlay, FaTimes, FaCog } from "react-icons/fa";
// Where te Socket.io server is running
const socket = io("http://localhost:3001");

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [actualTime, setActualTime] = useState("");
    const [play, setPlay] = useState(false);

    socket.on("play timer", function (timer) {
        setTimer(timer);
    });

    useEffect(() => {
        socket.on("connect", () => console.log(socket.id));
        socket.on("connect_error", () => {
            setTimeout(() => socket.connect(), 5000);
        });
        socket.on("play timer", function (timer) {
            setTimer(timer);
        });
        socket.on("disconnect", () => console.warn("Server disconnected"));
    }, []);

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
        setPlay(true);
    };
    const pauseTimer = () => {
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
                    </label>
                </div>
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
