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
        result.push(tiempos[i]);
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
