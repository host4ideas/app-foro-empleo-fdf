var express = require("express");
var router = express.Router();
const timer = require("../tiny-timer");
const publicDir = `${__dirname}/public`;
let initialTime = 0;

/**
 * Secure routes. If the user is not logged in, it will be redirected to /.
 */
const secured = (req, res, next) => {
    const isAuthenticated = !!req.user;
    if (isAuthenticated) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/");
};

function playTimer({ resume = false, start = false, duration = 0 } = {}) {
    if (resume) {
        timer.resume();
    } else if (start) {
        timer.stop();
        timer.start(duration);
    }
}

// router
//     .get("/server", secured, (req, res) => {
//         res.sendFile(`${publicDir}/server.html`);
//     })
//     .post("/start-streaming", secured, (req, res) => {
//         playTimer({ start: true, duration: initialTime });
//         res.send().status(200);
//     })
//     .post("/stop", secured, (req, res) => {
//         timer.stop();
//         nsp1.emit("play timer", 0);
//         nsp2.emit("play timer", 0);
//         mainNsp.emit("play timer", 0);
//         res.send().status(200);
//     })
//     .post("/resume", secured, (req, res) => {
//         timer.resume();
//         res.send().status(200);
//     })
//     .post("/pause", secured, (req, res) => {
//         timer.pause();
//         res.send().status(200);
//     });

module.exports = router;
