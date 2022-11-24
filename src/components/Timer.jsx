import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Where te Socket.io server is running
const socket = io("http://localhost:3001");

export default function Timer() {
    const [timer, setTimer] = useState(0);

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

    return (
        <div>
            <h2>Timer: {timer}<h3>Hola</h3></h2>
        </div>
    );
}
