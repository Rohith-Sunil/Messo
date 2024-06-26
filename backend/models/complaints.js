const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Signup = require("./signup");
const announcementSchema = new Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  complaints: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("announcement", announcementSchema);
