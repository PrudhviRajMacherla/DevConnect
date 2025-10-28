const express = require('express');

const connectionRouter = express.Router();
const authUser = require('../middlewares/auth');

const Connection = require('../models/connection');
const User = require('../models/user');


connectionRouter.post('/send/:status/:userId',authUser,async(req,res)=>{
    try{
        const ALLOWED_STATUS = ["ignored","interested"];
        const {status,userId} = req.params;
        const loggedInUser = req.user;
       

        if(!ALLOWED_STATUS.includes(status)){
            throw new Error('Invalid Status')
        }

        const validUser = await User.findById(userId);

        if(!validUser){
            throw new Error('Invalid Connection Request')
        }
        

        const prevConnection = await Connection.findOne({ $or: [
            {
                fromUserId:loggedInUser._id,
                toUserId:userId
            } ,
            {
                fromUserId:userId,
                toUserId:loggedInUser._id
            }
        ] });
       
        if(prevConnection){
            throw new Error('Connection Already Exist...')
        }

        await Connection.create({
           fromUserId:loggedInUser._id,
            toUserId:userId,
            status
        });
        
        res.status(200).send(loggedInUser.firstName+"send connection to "+validUser.firstName);

    }
    catch(err){
        return res.status(400).json({ message:err.message });
        
    }
});

connectionRouter.post('/review/:status/:requestId',authUser,async(req,res)=>{
    try{

        const ALLOWED_STATUS = ["accepted","rejected"];
        const {status,requestId} = req.params;

        if(!ALLOWED_STATUS.includes(status))
        {
            throw new Error('Invalid Status');
        }

        const requestFound = await Connection.findOne({
            _id:requestId,
            status:"interested"
        })

        if(!requestFound){
            throw new Error('Request status is other than interested state')
        }

        requestFound.status = status;
        await requestFound.save();
        res.send(requestFound);
    }
    catch(err){
         return res.status(400).json({ message:err.message });
    }
})


module.exports = connectionRouter;