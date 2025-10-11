const express = require("express");

const app = express();
const {auth,isadmin }= require('../middlwares/auth');
const {createUser,getUser}= require('../controllers/user')

let data = [
  {
    name: "prudhvi",
    gender: "male",
  },
];

app.post('/admin/user/:sn/:role',auth,isadmin,createUser)

app.get('/admin/user/:sn/:role',auth,isadmin,getUser)


app.listen(1111, () => {
  console.log(`server is running on port 1111`);
});
