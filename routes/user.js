const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { json } = require("express");
const fetchuser = require("../middleware/fetchuser");
const mongoose = require("mongoose");
const Android = require("../models/Android");
const { create } = require("../models/Android");
// const bodyParser = require("body-parser");

const secret = "$hivam";

// no login required
// end point :/api/auth/createuser
// ROUTE 1
router.post(
  "/createuser",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if the values are not entered as per the rules the error will be sent
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //already exists
        return res.status(400).json({ error: "email aleady exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        // domain: req.body.domain,
        // year: req.body.year,
      });

      // let androidInfo = await Android.find({});

      // if (!androidInfo) {
      //   androidInfo = new Android({});
      // }

      // if (user.year == 1) {
      //   let newArray = androidInfo.firstYear;
      //   newArray.push(user);
      //   await Android.updateOne({}, { $set: { firstYear: newArray } });
      // } else if (user.year == 2) {
      //   let newArray = androidInfo.secondYear;
      //   newArray.push(user);
      //   await Android.updateOne({}, { $set: { secondYear: newArray } });
      // } else if (user.year == 3) {
      //   let newArray = androidInfo.thirdYear;
      //   newArray.push(user);
      //   await Android.updateOne({}, { $set: { thirdYear: newArray } });
      // } else if (user.year == 4) {
      //   let newArray = androidInfo.fourthYear;
      //   newArray.push(user);
      //   await Android.updateOne({}, { $set: { fourthYear: newArray } });
      // }

      const data = {
        id: user.id,
      };

      const authToken = jwt.sign(data, secret);

      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("some error occured");
    }
  }
);

// *********************************************************************************************

// no login required
// end point :/api/auth/login
// ROUTE 2
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    console.log("login requested");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //if the values are not entered as per the rules the error will be sent
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "pls login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log(passwordCompare);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "pls login with correct credentials" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, secret);

      res.json({
        authToken,
        // user,
      });
    } catch (error) {}
  }
);

// login required
// end point :/api/auth/getuser
// ROUTE 3 : getting the loggedin user details

router.post("/getuser", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //if the values are not entered as per the rules the error will be sent
  }

  try {
    const userid = req.id;
    console.log(userid);
    const user = await User.findById(userid).select("-password");
    res.json(user);
    // res.send("okok");
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

// login req.

router.get("/allposts", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //if the values are not entered as per the rules the error will be sent
  }

  try {
    const userid = req.id;
    console.log(userid + "end");
    // const user = await User.findById(userid).select("-password");

    // console.log(user);
    // const userPostsID = user.posts; // not the array but find the available posts and form an array of that and then return that file
    // console.log("ids", userPostsID);

    // userPostsID.forEach(async (postId) => {
    //   let post = await Post.findById(postId);
    //   console.log(post);
    //   if (post != null) {
    //     console.log("inside if");
    //     userPosts.push(post);
    //     console.log("userpostnow", userPosts);
    //   }
    // });

    const userPosts = await Post.find({
      user: userid,
    });

    console.log(userPosts);
    res.json({ userPosts });
    // res.send("okok");
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
