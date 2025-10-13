const express = require("express");
const app = express();

const { connectDb } = require("../utils/database");
const User = require("../models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = req.body;

  const { firstName, lastName, AGE } = req.body;

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    age: AGE,
  });

  await user.save();

  res.send(user);
});

app.get("/user", async (req, res) => {
  try {
    const usersData = await User.find({ firstName: "prudhvi",lastName:"raj"});
    res.send(usersData);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

connectDb();
app.listen(4321, () => {
  console.log("Server is running......");
});
