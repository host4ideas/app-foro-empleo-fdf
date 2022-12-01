/**
 * Accepts miliseconds as parameter and returns seconds.
 * @param {number} ms Time in miliseconds
 * @returns {number} Seconds
 */
function msToSeconds(ms) {
    return Math.floor(ms / 1000);
}

/**
 * Accepts miliseconds as parameter and returns the time parsed as: hh:mm:ss
 * @param {number} milliseconds  Time in miliseconds
 * @returns {string} hh:mm:ss
 */
function msToMinutesSecondsAndHours(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
    ].join(":");
}

module.exports = { msToSeconds, msToMinutesSecondsAndHours };
