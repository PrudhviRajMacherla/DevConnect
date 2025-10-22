const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { validateSignup } = require("../utils/validateSignup");
const { connectDb } = require("../utils/database");
const User = require("../models/user");

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    console.log("line 46");
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
        expiresIn: "5m"
      });

      res.cookie("access_token", token);
      res.send("token sent sucessfully after login");
    } else {
      console.log("line 65");
      throw new Error("Invalid Credentials....");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { access_token } = req.cookies;
    console.log("line 93", access_token);

    // const decoded = await jwt.verify(access_token,"DevConnect@123");
    // console.log(decoded);

    const decoded = jwt.verify(access_token, "DevConnect@123");
    console.log("✅ Token verified:", decoded);

    // If token is valid, send user data
    const {_id}= decoded;
    const getUserData = await User.findById(_id);
    res.status(200).send({
      user: getUserData, // or fetch user from DB using decoded.id
    });
  } catch (err) 
  {
    return res.status(500).json({ message: "Internal server error" });
    
  }
});

connectDb()
  .then(() => {
    app.listen(4321, () => {
      console.log("server is started");
    });
  })
  .catch((err) => {
    console.log(
      "something went wrong unable to start server....." + err.message
    );
  });
