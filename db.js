const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/attendanceSystem";
const mongoURI =
  "mongodb+srv://shivam11kundra:8826609487@cluster0.pfl0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongo");
  });
};
module.exports = connectToMongo;
