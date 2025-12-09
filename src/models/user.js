const mongoose = require("mongoose");
const validate = require("validator");

const userSchema = new mongoose.Schema({
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
    default: "MERN Developer",
  },
});

const User = mongoose.model("User", userSchema); // create mongoose model

module.exports = User;
