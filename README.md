# devTinder

we can use await User.create(userObj);
in place of this two line
const user = new User(userObj);
await user.save();

# //Get user by EmailID

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

# Get All users

app.get("/feed", async (req, res) => {
try {
const user = await User.find({});
res.send(user);
} catch (err) {
res.status(400).send("Something went wrong");
}
});

# Delete API

app.delete("/user", async (req, res) => {
try {
const userId = req.body.userId;
const DelUser = await User.findByIdAndDelete(userId);
res.send("User deleted successfully");
} catch (err) {
res.status(400).send("Something went wrong");
}
});

# Update user data

app.patch("/user", async (req, res) => {
try {
const data = req.body;
const userId = req.body.\_id;
await User.findByIdAndUpdate(
{ \_id: userId },
data,
(returnDocument = "after")
); // data is here updated fileds userId is field which have to update.
res.send("User data has been updated");
} catch (err) {
res.status(400).send("Somthing went wrong!");
}
});
