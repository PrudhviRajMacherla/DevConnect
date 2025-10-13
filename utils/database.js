const mongoose = require("mongoose");

const mongouri =
  "mongodb+srv://ZerodhaCloneDataBase:ZerodhaCloneDataBase2025@zerodhaclonecluster.uirs9xu.mongodb.net/devConnect";

const connectDb = async () => {
  await mongoose.connect(mongouri)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log("unable to connect to database"+err));
};

module.exports ={connectDb};
