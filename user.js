const mongoose = require("mongoose");
const Link = require("./link");

const user = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  userLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: Link }],
});

module.exports = mongoose.model("User", user);
