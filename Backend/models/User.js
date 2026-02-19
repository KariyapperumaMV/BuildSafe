const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  nic: String,

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
