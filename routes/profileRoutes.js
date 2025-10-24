const express = require('express');
const profileRouter = express.Router();
const authUser = require('../middlewares/auth');

profileRouter.get("/profile/view", authUser, async (req, res) => {
  try {
    res.status(200).send({
      user: req.user, // or fetch user from DB using decoded.id
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = profileRouter;