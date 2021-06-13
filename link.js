const mongoose = require("mongoose");
const Traffic = require("./traffic");

const link = new mongoose.Schema({
  linkName: String,
  linkDes: String,
  urlGen: String,
  createDate: String,
  linkCheck: String,
  linkData: [{ type: mongoose.Schema.Types.ObjectId, ref:Traffic }],
});

module.exports = mongoose.model("Link", link);
