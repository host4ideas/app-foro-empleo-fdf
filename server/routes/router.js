const express = require("express");
const router = express.Router();
const passport = require("passport");

// Routes
router.get("/check-user", (req, res) => {
    const isAuthenticated = !!req.user;
    res.send(isAuthenticated);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    if (!!req.user) {
        res.send(req.user);
    } else {
        res.status(401).send();
    }
});

router.post("/test", (req, res) => {
    console.log(req.user);
    res.status(200).send(req.user);
});

module.exports = router;
