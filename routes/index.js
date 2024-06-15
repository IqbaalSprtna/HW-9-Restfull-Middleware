const express = require("express");
const router = express.Router();
const users = require("./user");
const movies = require("./movie");

router.use("/users", users);
router.use("/movies", movies);

module.exports = router;
