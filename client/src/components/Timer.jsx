import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Where te Socket.io server is running
const socket = io("http://localhost:3001");

export default function Timer() {
    const [timer, setTimer] = useState(0);
    let connRetries = 0;

    socket.on("play timer", function (timer) {
        setTimer(timer);
    });

    useEffect(() => {
        console.log(process.env.REACT_APP_SOCKET_CONNECTION);

        socket.on("connect", () => console.log(socket.id));
        socket.on("connect_error", () => {
            connRetries++;
            if (connRetries <= 4) {
                setTimeout(() => {
                    socket.connect();
                }, 5000);
            } else {
                console.error("Unable to connect to the socket service");
                socket.disconnect();
            }
        });
        socket.on("play timer", function (timer) {
            setTimer(timer);
        });
        socket.on("disconnect", () => console.warn("Server disconnected"));
    });

    return (
        <div>
            <h2>Timer: {timer}</h2>
        </div>
    );
}
