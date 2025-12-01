const express = require("express");
const connectDB = require("./config/database");
const app = express(); // create new appliction of express.

const User = require("./models/user");

app.use(express.json()); // this will work on every route, this help to conver json to js object.

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body); // creating a new instance of the user model
  try {
    await user.save();
    res.send("User added successfully.....");
  } catch (error) {
    res.status(400).send(`We found issue to same data ${error.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("Data base connected successful");
    app.listen(5050, () => {
      console.log("Animesh Sinngh server running on 5050");
    });
  })
  .catch((err) => {
    console.error(`Not able to connect ${err.message}`);
  });
