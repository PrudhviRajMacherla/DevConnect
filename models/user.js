const mongoose = require("mongoose");
const validator = require("validator");

// alt + shift + f -> format document

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value); // checks if valid email
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  age: {
    type: Number,
    min: [18, "Minimum age should be 18"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    message: "Invalid email format",
  },
  hobbies: {
    type: [String],
  },
  photoUrl: {
    type: String,
    default:
      "https://in.images.search.yahoo.com/yhs/view;_ylt=AwrPrxfB9u1oyB0RDA0O9olQ;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzM4YjdlMDQ0Y2YwOWNkZDhjZjNiYjc0YjE3N2U0ZGFhBGdwb3MDMTAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fyhs%2Fsearch%3Fp%3Dapj%2Bpic%26ei%3DUTF-8%26type%3Dtype80260-250692482%26fr%3Dyhs-sz-002%26hsimp%3Dyhs-002%26hspart%3Dsz%26param1%3D1957408124%26tt%3Dapj%2Bpic3%26imgurl%3Dhttps%253A%252F%252Fwww.bing.com%252Fimages%252Fsearch%253Fview%253DdetailV2%2526ccid%253DfH48H%252Fb0%2526id%253D073A7E7F39E0E4F44D3AF1E0CA6B0DB0B318E56E%2526thid%253DOIP.fH48H_b0ix86o6RSE0sR8gHaHa%2526mediaurl%253Dhttps%253A%252F%252Fwallpaperaccess.com%252Ffull%252F3684941.jpg%2526exph%253D1440%2526expw%253D1440%2526q%253Dapj%252520pic%2526ck%253D5266AE3E45E2A4C6B92E5CF05E46D686%2526idpp%253Drc%2526idpview%253Dsingleimage%2526form%253Drc2idp%26turl%3Dhttps%253A%252F%252Fsp.yimg.com%252Fib%252Fth%252Fid%252FOIP.fH48H_b0ix86o6RSE0sR8gHaHa%253Fpid%253DApi%2526w%253D148%2526h%253D148%2526c%253D7%2526dpr%253D2%2526rs%253D1%26sigi%3D9ai3xzeUbDoO%26sigt%3D3TtwqNeEwClQ%26sigit%3DwlukuYv63ENZ%26tab%3Dorganic%26ri%3D10&w=850&h=638&imgurl=e0.pxfuel.com%2Fwallpapers%2F215%2F664%2Fdesktop-wallpaper-dr-apj-abdul-kalam-technical-university-latest-news-videos.jpg&rurl=https%3A%2F%2Fwww.animalia-life.club%2Fqa%2Fpictures%2Fapj-abdul-kalam-wallpaper.html&size=80KB&p=apj+pic&oid=38b7e044cf09cdd8cf3bb74b177e4daa&fr2=&fr=yhs-sz-002&tt=Apj+Abdul+Kalam+Wallpaper&b=0&ni=160&no=10&ts=&tab=organic&sigr=xOnJG2H7lDSQ&sigb=TEdVo7KEY2f4&sigi=PjjMAi30Q35C&sigt=8lQ7Ea_2o9o5&.crumb=aLAbBP7dwN6&fr=yhs-sz-002&hsimp=yhs-002&hspart=sz&type=type80260-250692482&param1=1957408124",
  },
},{
  timestamps:true
});
module.exports = mongoose.model("user", userSchema);
