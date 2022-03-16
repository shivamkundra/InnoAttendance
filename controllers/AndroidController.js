const Android = require("../models/Android");
const User = require("../models/User");

module.exports.firstYear = async (req, res) => {
  try {
    let androidInfo = await Android.find({});
    console.log("infoandroid", androidInfo);
    if (androidInfo.length === 0) {
      // res.json({ message: "no student is there to show" });
      androidInfo = new Android({});
      await androidInfo.save();
    }
    console.log("infoandroid", androidInfo);

    if (req.code != androidInfo.code) {
      return res.json({ error: "you are not authenticated" });
    }

    res.json({
      students: androidInfo.firstYear,
      message: "hello",
    });
  } catch (error) {
    console.log(error);
  }
};
