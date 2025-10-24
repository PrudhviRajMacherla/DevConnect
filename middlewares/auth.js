const jwt  = require('jsonwebtoken');
const User = require('../models/user');

const authUser = async(req,res,next)=>{
    try{
        const { token } = req.cookies;
        const decodedObj =await jwt.verify(token, "DevConnect@123");
        const {_id}= decodedObj;
        const userFound = await User.findById(_id);
        if(!userFound)
        {
            throw new Error('Invalid User')
        }

        req.user = userFound;
        next();
           

        
          
    }   
    catch(err){
        return res.status(500).json({ message: err.message});
    }
}

module.exports = authUser;
