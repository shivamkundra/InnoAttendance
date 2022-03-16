const mongoose = require("mongoose");
const { Schema } = mongoose;

const IOTSchema = new Schema({
  firstYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  },
  secondYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  },
  thirdYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  },
  fourthYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  },
  code: {
    type: String,
    default: "$h!v@m",
  },
});

const model = mongoose.model("IOT", IOTSchema);

module.exports = model;
