const express = require('express');
const authRouter = express.Router();
const { validateSignup } = require('../utils/validateSignup');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    validateSignup(req);
    const previousData = await User.findOne({ email: email });

    if (previousData) {
      throw new Error("User is already Exists ");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    console.log('line 34 authRoutes')
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });

    if (!userFound) {
      throw new Error("Register First to login");
    }

    const isvalidpassword = await bcrypt.compare(password, userFound.password);

    if (isvalidpassword) {
      const payload = {
        _id: userFound._id,
      };

      const token = await jwt.sign(payload, "DevConnect@123", {
        expiresIn: "1d",
      });

      res.cookie("token", token);
      res.send("token sent sucessfully after login");
    } else {
      throw new Error("Invalid Credentials....");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  }).send('logout successfull');
});

module.exports = authRouter;