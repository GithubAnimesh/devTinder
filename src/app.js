const express = require("express");
const connectDB = require("./config/database");
const app = express(); // create new appliction of express.

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Ankita",
    lastName: "Sinngh",
    emailId: "ankitavns@gmail.com",
    password: "Thakuri@1",
  };
  const user = new User(userObj); // creating a new instance of the user model
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
