import urlBase64ToUint8Array from "./utils/urlBase64ToUint8Array";

const convertedVapidKey = urlBase64ToUint8Array(
    "BCVSe35WRbz4Vta2rxptEvFvyoiNEuFuzWWxGAL0ypsHVSjHpefIEEdeOZjx85wfQ2pRo6VkwC7goFJXT-lXGqE"
);

function sendSubscription(subscription) {
    return fetch(`http://localhost:9000/notifications/subscribe`, {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.warn(
            "unable to reach push notifications service\nmessage: " +
                error.message
        );
    });
}

export function subscribeUser() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
            .then(function (registration) {
                if (!registration.pushManager) {
                    console.log("Push manager unavailable.");
                    return;
                }

                registration.pushManager
                    .getSubscription()
                    .then(function (existedSubscription) {
                        if (existedSubscription === null) {
                            console.log(
                                "No subscription detected, make a request."
                            );
                            registration.pushManager
                                .subscribe({
                                    applicationServerKey: convertedVapidKey,
                                    userVisibleOnly: true,
                                })
                                .then(function (newSubscription) {
                                    console.log("New subscription added.");
                                    sendSubscription(newSubscription);
                                })
                                .catch(function (e) {
                                    if (Notification.permission !== "granted") {
                                        console.log(
                                            "Permission was not granted."
                                        );
                                    } else {
                                        console.error(
                                            "An error ocurred during the subscription process.",
                                            e
                                        );
                                    }
                                });
                        } else {
                            console.log("Existed subscription detected.");
                            sendSubscription(existedSubscription);
                        }
                    });
            })
            .catch(function (e) {
                console.error(
                    "An error ocurred during Service Worker registration.",
                    e
                );
            });
    }
}
