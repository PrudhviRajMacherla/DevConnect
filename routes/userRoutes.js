const express = require("express");
const userRouter = express.Router();
const authUser = require("../middlewares/auth");

const {allReceivedConnections,allUserConnections, userFeed} = require('../controllers/userController');


userRouter.get('/received/requests',authUser,allReceivedConnections);
userRouter.get('/connections',authUser,allUserConnections);
userRouter.get('/feed',authUser,userFeed);



module.exports = userRouter;
