const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const app = express(); // create new appliction of express.
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const User = require("./models/user");

app.use(express.json()); // this will work on every route, this help to conver json to js object.
app.use(cookieParser()); // to get cookies responce back

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    // validate data first
    validateSignUpData(req);
    // encypt password
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // creating a new instance of the user model
    await user.save();
    res.send("User added successfully.....");
  } catch (error) {
    res.status(400).send(`We found issue to same data ${error.message}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid creds...");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create a JWT token
      const toket = await jwt.sign({ _id: user._id }, "DEV@Tinder$790"); //get token with hiding id and (secret key)
      //add token to cookies and send the responce back to the user
      res.cookie("token", toket);
      res.send("User login successful");
    } else {
      throw new Error("Invalid creds...");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR:", error.message);
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
      (returnDocument = "after")
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
