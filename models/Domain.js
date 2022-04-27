const mongoose = require("mongoose");
const { Schema } = mongoose;

const DomainSchema = new Schema({
  domainName: {
    type: String,
    default: "",
  },
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

const model = mongoose.model("Domain", DomainSchema);

module.exports = model;
