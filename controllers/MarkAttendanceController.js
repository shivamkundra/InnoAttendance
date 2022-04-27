const Domain = require("../models/Domain");
const User = require("../models/User");

module.exports.list = async (req, res) => {
  try {
    console.log(req.params);

    const domainName = "" + req.params.domain;
    const year = req.params.year;
    console.log(domainName);
    console.log(year);
    let DomainInfo = await Domain.findOne({ domainName });

    console.log("DomainInfo", DomainInfo);

    if (DomainInfo === null) {
      DomainInfo = new Domain({ domainName });
      await DomainInfo.save();
    }

    console.log("DomainInfo", DomainInfo);
    console.log(DomainInfo.code);
    console.log(req.body.code);

    if (req.body.code != DomainInfo.code) {
      return res.json({ error: "you are not authenticated" });
    }

    // console.log("infoandroid1st", androidInfo[0].firstYear);

    let list;

    if (year == "firstYear") {
      list = DomainInfo.firstYear;
    } else if (year == "secondYear") {
      list = DomainInfo.secondYear;
    } else if (year == "thirdYear") {
      list = DomainInfo.thirdYear;
    } else if (year == "fourthYear") {
      list = DomainInfo.fourthYear;
    }

    console.log(list);

    return res.json({
      students: list,
      message: "hello",
    });
  } catch (err) {
    console.log(err);
  }
};
