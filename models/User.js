const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  attendance: {
    type: Number,
    default: 0,
  },
  attendanceRecord: {
    type: Array,
    default: [],
  },
  domain: {
    type: String,
    default: "",
  },
  year: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("user", UserSchema);
// User.createIndexes(); //prevents duplicate value
module.exports = User;
