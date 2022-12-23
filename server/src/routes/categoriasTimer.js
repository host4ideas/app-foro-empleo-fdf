const express = require("express");
const router = express.Router();
const { getData, deleteData, postData, putData } = require("../utils/utils");
require("dotenv").config();

module.exports = function () {
    // Routes
    router.get("/api/CategoriasTimer", (req, res) => {
        getData()
    });

    router.post(
        "/api/CategoriasTimer",
        passport.authenticate("local"),
        (req, res) => {
            if (!!req.user) {
                res.send(req.user);
            } else {
                res.status(401).send();
            }
        }
    );
};
