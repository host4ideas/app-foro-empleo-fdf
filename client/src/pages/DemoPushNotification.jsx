import React, { useState } from "react";
import { urlBase64ToUint8Array } from "../utils/utils";

export default function DemoPushNotification() {
    const [payload, setPayload] = useState("Insert here a payload");
    const [delay, setDelay] = useState(1);
    const [ttl, setTtl] = useState(1);

    navigator.serviceWorker
        .getRegistration()
        .then((registration) => console.log(registration));

    navigator.serviceWorker.ready
        .then((registration) => {
            return registration.pushManager
                .getSubscription()
                .then(async (subscription) => {
                    // registration part
                    if (subscription) {
                        return subscription;
                    }

                    const response = await fetch(
                        "http://localhost:9000/vapidPublicKey"
                    );
                    const vapidPublicKey = await response.text();
                    const convertedVapidKey =
                        urlBase64ToUint8Array(vapidPublicKey);
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidKey,
                    });
                });
        })
        .then((subscription) => {
            // subscription part
            fetch("http://localhost:9000/register", {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ subscription }),
            });

            document.getElementById("doIt").onclick = () => {
                fetch("http://localhost:9000/sendNotification", {
                    method: "post",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        subscription,
                        payload,
                        delay,
                        ttl,
                    }),
                });
            };
        });

    const handleChangePayload = (e) => {
        setPayload(e.target.value);
    };

    const handleChangeDelay = (e) => {
        setDelay(parseInt(e.target.value));
    };

    const handleChangeTtl = (e) => {
        setTtl(parseInt(e.target.value));
    };
    return (
        <div>
            <p>
                This demo shows how to send push notifications with a payload.
            </p>
            Notification payload:
            <input
                id="notification-payload"
                type="text"
                defaultValue={payload}
                onChange={handleChangePayload}
            ></input>
            Notification delay:
            <input
                id="notification-delay"
                type="number"
                defaultValue={delay}
                onChange={handleChangeDelay}
            ></input>
            seconds Notification Time-To-Live:
            <input
                id="notification-ttl"
                type="number"
                defaultValue={ttl}
                onChange={handleChangeTtl}
            ></input>
            seconds
            <button id="doIt">Request sending a notification!</button>
        </div>
    );
}
