const validator = require("validator");
function validateSignup(req) {
  const { firstName, lastName, email, password } = req.body;
  
  

  // checking email is true or not
  console.log(firstName)
  if( !firstName ||  firstName.trim()==="" || firstName.trim().length<4){
    throw new Error("Invalid FirstName");

  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid password");
  }
  
//   const arr = ["firstName", "lastName", "email", "password"];
  
//       for (let x in req.body) {
//         if (!arr.includes(x)) {
//           throw new Error("unneccessary data is being sent");
//         }
//       }
  

}

module.exports = { validateSignup };
