const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { // TODO: should auto generated
    type: String,
    required: true,
    unique: true
  },
  name: String,
  nic: String,
  password: String, // TODO: should be stored in hashed

  user_type: {
    type: String,
    enum: ["ADMIN", "WORKER"],
    required: true
  },

  helmet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Helmet",
    default: null
  }
});

module.exports = mongoose.model("User", userSchema);
