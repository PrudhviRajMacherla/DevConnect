const express = require('express');

const app = express();


app.use('/hello',(req,res)=>{
    res.send('i am from server')
})

app.listen(4321,()=>{
    console.log(`server is running on port 4321`)
});