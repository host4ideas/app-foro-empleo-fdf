import React, { useState } from "react";
import io from "socket.io-client";

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const socket = io();

    socket.on("timer", function (timer) {
        console.log(timer);
        setTimer(timer);
    });

    return (
        <div>
            <h2>Timer: {timer}</h2>
        </div>
    );
}
