const mongoose = require("mongoose");

const traffic = new mongoose.Schema({
  uuid: String,
  link: String,
  cookieName: String,
  country: String,
  firstVisit: String,
  lastVisit: String,
  totalVisits: Number,
  browser: String,
  device: String,
});

module.exports = new mongoose.model("Traffic", traffic);
