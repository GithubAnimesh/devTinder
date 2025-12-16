const express = require("express");
const connectDB = require("./config/database");
const app = express(); // create new appliction of express.
const cookieParser = require("cookie-parser");

app.use(express.json()); // this will work on every route, this help to conver json to js object.
app.use(cookieParser()); // to get cookies responce back

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);

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
