const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

async function postData(
    url = "",
    data = {},
    token = null,
    returnsData = false
) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers:
            token != null
                ? {
                      Authorization: "Bearer " + token,
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                  }
                : {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (returnsData) {
        return response.json(); // parses JSON response into native JavaScript objects
    }
    return response;
}

async function putData(url = "", data = {}, token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response;
}

async function deleteData(url = "", token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit,
        headers: {
            Authorization: "Bearer " + token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response;
}

async function getData(url = "", token) {
    const response = await fetch(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

module.exports = {
    msToSeconds,
    msToMinutesSecondsAndHours,
    postData,
    putData,
    getData,
    deleteData,
};
