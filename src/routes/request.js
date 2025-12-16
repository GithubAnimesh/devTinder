const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();

requestsRouter.post("/", userAuth, (req, res) => {
  const user = req.user;
  res.send(user.firstName);
});

module.exports = requestsRouter;
