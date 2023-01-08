/**
 * Accepts miliseconds as parameter and returns the time parsed as: hh:mm:ss
 * @param {number} milliseconds  Time in miliseconds
 * @param {string} format Format to display the time (hh:mm:ss, hh:mm, hh)
 * @returns {string} hh:mm:ss
 */
export function msToMinutesSecondsAndHours(milliseconds, format) {
    const ms = parseInt(milliseconds);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);

    const tiempos = [hours, minutes, seconds]; // length = 3

    const partes = format.split(":"); // hh:mm:ss -> length = 3

    const result = [];

    for (let i = 0; i < partes.length; i++) {
        let parte = tiempos[i];
        if (parte < 10) {
            parte = "0" + parte;
        }
        result.push(parte);
    }

    return result.join(":");
}

// Web-Push
// Public base64 to Uint
export function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

// Notifications
//payload  CONTENIDO
//delay EL TIEMPO QUE TARDA EN MOSTRARSE,
//ttl EL TIEMPO QUE ESTA VIVO,
export function pushNotification(payload, delay, ttl) {
    console.log(payload, delay, ttl);
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
        });
}
