const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("Enter valid Email!");
        }
      },
    },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    about: { type: String },
    skills: {
      type: [String],
      default: ["MERN Developer"],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  //get token with hiding id and (secret key)
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordFromUser) {
  return await bcrypt.compare(passwordFromUser, this.password);
};

const User = mongoose.model("User", userSchema); // create mongoose model

module.exports = User;
