const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://annimeshsn_db_user:Thakurli1@animeshsinngh.evpvful.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
