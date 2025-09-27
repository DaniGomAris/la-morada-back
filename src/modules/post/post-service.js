const Post = require("./models/post");
const User = require("../user/models/user");
const logger = require("../../utils/logger");

class PostService {
  // CreatePost
  static async createPost(psychologist_id, title, content, active = true) {
    const user = await User.findById(psychologist_id);
    if (!user || user.role !== "psychologist") throw new Error("USER NOT FOUND OR NOT PSYCHOLOGIST");

    const post = new Post({ psychologist_id, title, content, active });
    await post.save();
    logger.info(`Post created by psychologist ${psychologist_id}`);
    return post;
  }

  // Get Posts
  static async getPosts() {
    const posts = await Post.find()
      .populate("psychologist_id", "name last_name1 last_name2")
      .sort({ created_at: -1 });
    return posts;
  }

  // GetPostById
  static async getPostById(post_id) {
    const post = await Post.findById(post_id)
      .populate("psychologist_id", "name last_name1 last_name2");
    if (!post) throw new Error("POST NOT FOUND");
    return post;
  }

  // UpdatePost
  static async updatePost(post_id, updates, user_id) {
    const post = await Post.findById(post_id);
    if (!post) throw new Error("POST NOT FOUND");

    // Check if the post belongs to the psychologist trying to edit
    if (post.psychologist_id.toString() !== user_id) {
      throw new Error("ACCESS DENIED");
    }

    if (updates.title !== undefined) post.title = updates.title;
    if (updates.content !== undefined) post.content = updates.content;
    if (updates.active !== undefined) post.active = updates.active;

    await post.save();
    logger.info(`Post updated: ${post_id}`);
    return post;
  }

  // DeletePost
  static async deletePost(post_id, user_id) {
    const post = await Post.findById(post_id);
    if (!post) throw new Error("POST NOT FOUND");

    // Check if the post belongs to the psychologist trying to delete
    if (post.psychologist_id.toString() !== user_id) {
      throw new Error("ACCESS DENIED");
    }

    await Post.findByIdAndDelete(post_id);
    logger.info(`Post deleted: ${post_id}`);
    return post;
  }
}

module.exports = PostService;
