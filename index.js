const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.send("Welcome stranger! Please sign in or sign up.");
    } else {
      authData;
      res.send("Welcome back member!");
    }
  });
});

// Fake user loging
app.post("/login", (req, res) => {
  // Mock data to login
  const user = {
    id: 1,
    username: "sarp",
    email: "sarp@gmail.com",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`Example app is listening on port ${port}`);
});
