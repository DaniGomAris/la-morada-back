const PostService = require("./post-service");
const { validatePost } = require("./validators/post-validator");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class PostController {

  // Create post
  static async createPost(req, res) {
    try {
      const psychologist_id = req.user.user_id;
      const { title, content, active } = req.body;

      validatePost({ title, content, active });

      const post = await PostService.createPost(psychologist_id, title, content, active);
      res.status(201).json({ success: true, post });
    } catch (err) {
      logger.error(`PostController.createPost: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get posts
  static async getPosts(req, res) {
    try {
      const posts = await PostService.getPosts();
      res.status(200).json({ success: true, posts });
    } catch (err) {
      logger.error(`PostController.getPosts: ${err.message}`);
      handleError(res, err);
    }
  }

  // Get post by id
  static async getPostById(req, res) {
    try {
      const post_id = req.params.id;
      const post = await PostService.getPostById(post_id);
      res.status(200).json({ success: true, post });
    } catch (err) {
      logger.error(`PostController.getPostById: ${err.message}`);
      handleError(res, err);
    }
  }

  // Update post
  static async updatePost(req, res) {
    try {
      const post_id = req.params.id;
      const updates = req.body;
      validatePost(updates);

      const post = await PostService.updatePost(post_id, updates, req.user.user_id);
      res.status(200).json({ success: true, post });
    } catch (err) {
      logger.error(`PostController.updatePost: ${err.message}`);
      handleError(res, err);
    }
  }

  // Delete post
  static async deletePost(req, res) {
    try {
      const post_id = req.params.id;
      await PostService.deletePost(post_id, req.user.user_id);
      res.status(200).json({ success: true, message: "Post deleted" });
    } catch (err) {
      logger.error(`PostController.deletePost: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = PostController;
