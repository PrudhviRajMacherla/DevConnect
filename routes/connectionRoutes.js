const express = require('express');
const connectionRouter = express.Router();
const authUser = require('../middlewares/auth');
const {sendConnection, reviewConnection} = require('../controllers/connectionController');


connectionRouter.post('/send/:status/:userId',authUser,sendConnection);
connectionRouter.post('/review/:status/:requestId',authUser,reviewConnection);

module.exports = connectionRouter;