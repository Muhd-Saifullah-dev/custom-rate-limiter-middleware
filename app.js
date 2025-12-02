const express = require("express");
const { rateLimiter } = require("./middleware/rateLimiting");
const app = express();

app.use(express.json());
app.use(rateLimiter)

app.get("/", (req, res) => {
  res.send("Hello! You are within the request limit.");
});


module.exports = app;
