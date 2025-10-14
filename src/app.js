const express = require("express");
const app = express();
const validator = require('validator');

const { connectDb } = require("../utils/database");
const User = require("../models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    try{
      
      const arr = ['firstName','lastName','email','password'];

      for (let x in req.body) {
        if(!arr.includes(x))
        {
          throw new Error('unneccessary data is being sent')
        }
      }

      
      let {firstName,lastName,email,password} = req.body;
      if(!validator.isEmail(email)){
        throw new Error('email wrong api level validation')
      }
      console.log(req.body);
      firstName = firstName.trim();
      if(firstName.length>0||password){
        console.log(firstName);
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
      }
      else{
        throw new Error('Make sure you enter a valid name');
      }
    }
    catch(err){
     
      res.status(500).send('something went wrong'+err)
    }
});

app.get("/user/:name", async (req, res) => {
  try {
    const {name}= req.params;
    const singleUser = await User.findOne({firstName:name});
    if(!singleUser){
      res.send('user not found');
    }

    else{

      res.status(200).send(singleUser);
    }

     
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

connectDb().
then(()=>{
  app.listen(4321,()=>{
    console.log('server is started')
  })
})
.catch((err)=>{
  console.log('something went wrong unable to start server.....'+err.message)
})
