const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const { connectDb } = require("../utils/database");
const User = require("../models/user");
const authUser = require("../middlewares/auth");

const authRouter = require('../routes/authRoutes');
const profileRouter = require('../routes/profileRoutes');

app.use(express.json());
app.use(cookieParser());

// app.post("/register", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     validateSignup(req);
//     const previousData = await User.findOne({ email: email });

//     if (previousData) {
//       throw new Error("User is already Exists ");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userFound = await User.findOne({ email: email });

//     if (!userFound) {
//       throw new Error("Register First to login");
//     }

//     const isvalidpassword = await bcrypt.compare(password, userFound.password);

//     if (isvalidpassword) {
//       const payload = {
//         _id: userFound._id,
//       };

//       const token = await jwt.sign(payload, "DevConnect@123", {
//         expiresIn: "1d",
//       });

//       res.cookie("token", token);
//       res.send("token sent sucessfully after login");
//     } else {
//       throw new Error("Invalid Credentials....");
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post("/logout", async (req, res) => {

//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//   }).send('logout successfull');
// });


app.use('/',authRouter);
app.use('/',profileRouter);


// app.get("/profile", authUser, async (req, res) => {
//   try {
//     res.status(200).send({
//       user: req.user, // or fetch user from DB using decoded.id
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

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
