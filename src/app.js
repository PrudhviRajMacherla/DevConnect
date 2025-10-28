const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const { connectDb } = require("../utils/database");

app.use(express.json());
app.use(cookieParser());


const authRouter = require('../routes/authRoutes');
const profileRouter = require('../routes/profileRoutes');
const connectionRouter = require('../routes/connectionRoutes');
const userRouter = require("../routes/userRoutes");

app.use('/auth',authRouter);
app.use('/profile',profileRouter);
app.use('/request',connectionRouter);
app.use('/user',userRouter)


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
