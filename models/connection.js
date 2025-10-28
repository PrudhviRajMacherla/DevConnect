const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionSchema.pre("save", function (next) {
  const a = this;
  if (a.fromUserId.equals(a.toUserId)) {
    throw new Error("can't send request to yourself");
  }
  next();
});

module.exports = mongoose.model("connection", connectionSchema);
