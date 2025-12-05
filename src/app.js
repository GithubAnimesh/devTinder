const express = require("express");
const connectDB = require("./config/database");
const app = express(); // create new appliction of express.

const User = require("./models/user");

app.use(express.json()); // this will work on every route, this help to conver json to js object.

app.post("/signup", async (req, res) => {
  const user = new User(req.body); // creating a new instance of the user model
  try {
    await user.save();
    res.send("User added successfully.....");
  } catch (error) {
    res.status(400).send(`We found issue to same data ${error.message}`);
  }
});

//Get user by EmailID
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const user = await User.find({ emailId: userEmail });
    if (!user.length) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Get All users
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Delete API

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const DelUser = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update user data

app.patch("/user", async (req, res) => {
  try {
    const data = req.body;
    const userId = req.body._id;
    await User.findByIdAndUpdate(
      { _id: userId },
      data,
      (returnDocument = "before")
    ); // data is here updated fileds userId is field which have to update.
    res.send("User data has been updated");
  } catch (err) {
    res.status(400).send("Somthing went wrong!");
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
