const Auther = require("../../models/Author");
const Post = require("../../models/Post");
const Tag = require("../../models/Tag");
const { post } = require("./post.routes");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const newPost = await Post.create(req.body);
    await Auther.findByIdAndUpdate(req.body.auther, {
      $push: { posts: newPost._id },
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    const post = await post.findById(req.post.id);
    if (post.user.equals(req.user._id)) {
      await post.findByIdAndRemove({ _id: req.post.id });
    } else {
      return res
        .status(401)
        .json({ msg: "you can not delete someone else post! " });
    }
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("tags", "-_id", "-__v")
      .populate("auther", "name");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.addPostToTag = async (req, res, next) => {
  try {
    const { postId, tagId } = req.params;
    await Post.findByIdAndUpdate(postId, { $push: { tags: tagId } });
    await Tag.findByIdAndUpdate(tagId, { $push: { posts: postId } });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
