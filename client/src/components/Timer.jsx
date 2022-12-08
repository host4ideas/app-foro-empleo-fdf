import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./timer.css";

// Where te Socket.io server is running
const socket = io("http://localhost:3001");

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [actualTime, setActualTime] = useState("");

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

    useEffect(() => {
        const timer = window.setInterval(() => {
            showTime();
        }, 1000);
        return () => {
            // Return callback to run on unmount.
            window.clearInterval(timer);
        };
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
        <div className="row mt-4">
            <div className="timer">
                <div className="icon timer-icon">start</div>
                <h1 className="timer-title">{timer}</h1>
            </div>
            <div className="col-md-6 offset-md-3">
                <p className="fst-italic">{actualTime}</p>
            </div>
        </div>
    );
}
