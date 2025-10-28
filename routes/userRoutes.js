const express = require('express');
const userRouter = express.Router();
const authUser = require('../middlewares/auth');
const Connection = require('../models/connection');


userRouter.get("/received/requests", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await Connection.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",["firstName","lastName"]);

    return res.send(receivedRequests);

  
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;