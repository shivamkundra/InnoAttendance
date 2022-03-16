const mongoose = require("mongoose");
const { Schema } = mongoose;

const AndroidSchema = new Schema({
  firstYear: {
    type: Array,
    default: [],
  },
  secondYear: {
    type: Array,
    default: [],
  },
  thirdYear: {
    type: Array,
    default: [],
  },
  fourthYear: {
    type: Array,
    default: [],
  },
  code: {
    type: String,
    default: "$h!v@m",
  },
});

const model = mongoose.model("Android", AndroidSchema);

module.exports = model;
