const { db } = require("../models/Domain");
const Domain = require("../models/Domain");
const User = require("../models/User");

module.exports.add = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.id);

    const user = await User.findOne({ _id: req.id });

    console.log(user);
    if (user.domain !== "") {
      return res.json({
        message: "already registered",
        user,
      });
    }
    const domainName = req.body.domain;
    const year = req.body.year;
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
      list.push(req.id);
      Domain.updateOne({ domainName }, { $set: { firstYear: list } });
    } else if (year == "thirdYear") {
      list = DomainInfo.thirdYear;
      list.push(req.id);
      Domain.updateOne({ domainName }, { $set: { firstYear: list } });
    } else if (year == "fourthYear") {
      list = DomainInfo.fourthYear;
      list.push(req.id);
      Domain.updateOne({ domainName }, { $set: { firstYear: list } });
    }
    console.log(User);
    await User.updateOne(
      { _id: req.id },
      { $set: { domain: req.body.domain, year: req.body.year } }
    );

    console.log(list);

    user = User.findById(req.id);
    // list.push(req.id);

    return res.json({
      // students: list,
      // message: "hello",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
