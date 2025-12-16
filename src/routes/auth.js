const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    // validate data first
    validateSignUpData(req);
    // encypt password
    const passwordHash = await bcrypt.hash(password, 10);
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid creds...");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT token
      const toket = await user.getJWT();
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

module.exports = authRouter;
