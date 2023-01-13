const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { postData } = require("../utils/utils");
require("dotenv").config();

module.exports = function () {
    function getApiToken(username, password) {
        return new Promise((res, rej) => {
            postData(
                process.env.API_TIMERS + "/Auth/Login",
                {
                    userName: username,
                    password: password,
                },
                null,
                true
            ).then((data) => {
                if (data.response) {
                    res(data.response); // JSON data parsed by `data.json()` call
                } else {
                    rej("login unauthorized");
                }
            });
        });
    }

    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            (username, password, done) => {
                if (username != "" && password != "") {
                    const USER = {
                        id: username,
                    };
                    getApiToken(username, password)
                        .then((token) => {
                            USER.token = token;
                            return done(null, USER);
                        })
                        .catch((error) => {
                            console.log(error);
                            return done(null, false);
                        });
                } else {
                    console.log("invalid credentials");
                    return done(null, false);
                }
            }
        )
    );

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });
};
