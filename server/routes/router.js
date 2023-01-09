const express = require("express");
const router = express.Router();
const passport = require("passport");

// Routes
router.get("/check-user", (req, res) => {
  const isAuthenticated = !!req.user;
  res.send(isAuthenticated);
});

router.post("/login", (req, res) => {
  res.send();
  //   var user_name = req.body.user;
  //   var password = req.body.password;

  //   if (user_name === "JUAN" && password === "12345") {
  //     res.send();
  //   }
});

router.post("/test", (req, res) => {
  console.log(req.user);
  res.status(200).send(req.user);
});

module.exports = router;
