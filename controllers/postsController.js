// const Posts = require("../models/posts");
// const User = require("../models/user");

// module.exports.create = async (req, res) => {
//   const { user, img, caption, likes, comments, likesArray, commentsArray } =
//     req.body;

//   const post = new Posts({
//     user,
//     img,
//     caption,
//     likes,
//     comments,
//     likesArray,
//     commentsArray,
//   });

//   // const userofpost = await User.findById(req.id);
//   // console.log(req.id);
//   // console.log(userofpost);

//   // userofpost.posts.push(post.id);
//   // await userofpost.save();

//   await post.save();

//   res.json(post);
// };

// module.exports.allposts = async (req, res) => {
//   if (req.id) {
//     const allposts = await Posts.find({});

//     // const user = User.findById(req.id);
//     // console.log(user);

//     // const allpostid = user.posts;

//     res.json({ allposts });
//   } else {
//     res.send("user not valid");
//   }
// };

// module.exports.delete = async (req, res) => {
//   let post = await Posts.findById(req.params.id);
//   // if note doesnt exist
//   if (!post) {
//     return res.sendStatus(404);
//   }
//   // if the user is trying to delete others notes
//   if (post.user.toString() !== req.id) {
//     return res.status(401).send("not allowed");
//   }

//   post = await Posts.findByIdAndDelete(req.params.id);
//   res.json(post);
// };
