const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const validator = require("validator");

const {validateSignup} = require('../utils/validateSignup');
const { connectDb } = require("../utils/database");
const User = require("../models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

  const {firstName,lastName,email,password} = req.body;
  
  try{
     validateSignup(req);
     const previousData = await User.findOne({email:email});
     
     if(previousData){
      throw new Error("User is already Exists ")
     }
     
     const hashedPassword =await bcrypt.hash(password,10);
     const newUser = new User({
      firstName,
      lastName,
      email,
      password :hashedPassword
     })
     await newUser.save();
     res.status(201).send(newUser)
     
  }
  catch(error){
    res.status(500).send(error.message)
  }
   

});


app.post("/login",async(req,res)=>{
  try{
 

   const {email,password} = req.body;
   const validuser = await User.findOne({email:email});
   console.log(validuser); 

    if(!validuser){
      throw new error('user was not found please Signup');
    }

    const isvalidpassword =  await bcrypt.compare(password,validuser.password);

    if(!isvalidpassword)
    {
      throw new Error('Password Not matched');
    }

    res.send('token');


  }
  catch(error){
      res.status(500).send(error.message);
  }
})

app.get("/user/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const singleUser = await User.findOne({ firstName: name });
    if (!singleUser) {
      res.send("user not found");
    } else {
      res.status(200).send(singleUser);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

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
