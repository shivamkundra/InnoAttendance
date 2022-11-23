const Domain = require("../models/Domain");
const User = require("../models/User");

module.exports.present = async (req, res) => {
  try {
    console.log(req.body);

    const teacher = await User.findById({ _id: req.id });

    const students = req.body.list;
    const student = await User.findById({ _id: students[0] });
    const domainName = student.domain;
    const year = student.year;

    console.log(domainName, year);
    let DomainInfo = await Domain.findOne({ domainName });

    console.log("DomainInfo", DomainInfo);

    // console.log(DomainInfo.code);
    // console.log(req.body.code);

    // if (req.body.code != DomainInfo.code) {
    //   return res.json({ error: "you are not authenticated" });
    // }

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

    list.forEach(async (element) => {
      //this increase total classes helo of all students
      //inc total
      let student = await User.findOne({ _id: element });
      let ttn = student.classesHeld; //total till now
      ttn++;
      await User.updateOne({ _id: element }, { $set: { classesHeld: ttn } });
    });
    console.log("teacher" + teacher);
    const record = {
      date: Date.now,
      markedBy: {
        name: teacher.name,
        domain: teacher.domain,
        year: teacher.year,
      },
    };
    students.forEach(async (element) => {
      //this increases attendance of all students present
      let student = await User.findOne({ _id: element });
      let ptn = student.attendance; //present till now
      ptn++;
      let attendanceRecord = student.attendanceRecord;
      attendanceRecord.push(record);
      await User.updateOne(
        { _id: element },
        {
          $set: {
            attendance: ptn,
            attendanceRecord,
          },
        }
      );
    });

    return res.json({
      message: "hello",
    });
  } catch (err) {
    console.log(err);
  }
};
