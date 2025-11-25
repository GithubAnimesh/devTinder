const express = require("express");

const app = express(); // create new appliction of express.

// handle code, this is called request handler

app.get("/user", (req, res) => {
  res.send({ name: "Animesh", lastName: "Sinngh" });
});

app.post("/user", (req, res) => {
  res.send("Date save successfully");
});

app.listen(3000, () => {
  console.log("Animesh Sinngh server running on 3000");
}); // web server created and other can see in 3000 port
