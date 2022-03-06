const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is the main page of contacts");
});

router.get("/list", (req, res) => {
  res.send("this is the list page of contacts");
});

module.exports = router;
