const { db } = require("../models/Domain");
const Domain = require("../models/Domain");
const User = require("../models/User");

module.exports.add = async (req, res) => {
  try {
    console.log(req.params);

    const user = await User.findById(req.id);
    console.log(user.domain);
    if (user.domain !== "") {
      return res.json({
        message: "already registered",
      });
    }
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

    let list;

    if (year == "firstYear") {
      list = DomainInfo.firstYear;
      list.push(req.id);
      await Domain.updateOne({ domainName }, { $set: { firstYear: list } });
    } else if (year == "secondYear") {
      list = DomainInfo.secondYear;
      list.push(req.body.id);
      db.Domain.update({ domainName }, { $set: { firstYear: list } });
    } else if (year == "thirdYear") {
      list = DomainInfo.thirdYear;
      list.push(req.body.id);
      db.Domain.update({ domainName }, { $set: { firstYear: list } });
    } else if (year == "fourthYear") {
      list = DomainInfo.fourthYear;
      list.push(req.body.id);
      db.Domain.update({ domainName }, { $set: { firstYear: list } });
    }

    await User.updateOne(
      { _id: req.id },
      { $set: { domain: req.params.domain, year: req.params.year } }
    );

    console.log(list);

    // list.push(req.id);

    return res.json({
      students: list,
      message: "hello",
    });
  } catch (err) {
    console.log(err);
  }
};
