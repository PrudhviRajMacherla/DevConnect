const express = require('express');

const app = express();

// routes ,request handlers





app.use('/user/:abc/:xyz',(req,res)=>{
    console.log('normal params')
    const {abc}= req.params;
    console.log(req.params)
    //logic
    res.send(abc)
})


app.get('/product',(req,res)=>{
    console.log(req.query);
    res.send('query params')
})








app.listen(1111,()=>{
    console.log(`server is running on port 4321`)
});