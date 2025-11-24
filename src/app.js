const express = require("express");

const app = express(); // create new appliction of express.

// handle code, this is called request handler

app.use((req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log("Animesh Sinngh server running on 3000");
}); // web server created and other can see in 3000 port
