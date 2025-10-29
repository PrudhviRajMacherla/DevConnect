const express = require('express');
const profileRouter = express.Router();
const authUser = require('../middlewares/auth');
const {profileView} = require('../controllers/profileController')


// Route --> endpoint , [middlware1,middlware2,....], controller(reqhandler).
profileRouter.get("/view", authUser, profileView);

module.exports = profileRouter;