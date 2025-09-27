const express = require("express");
const { validToken } = require("../../middlewares/jwt-middleware");
const PostController = require("./post-controller");
const { authorizeRoles } = require("../../middlewares/role-middleware");

const router = express.Router();

// Create post
router.post("/create", validToken, authorizeRoles(["psychologist"]), PostController.createPost);

// Get posts
router.get("/", PostController.getPosts);

// Get posts by id
router.get("/:id", PostController.getPostById);

// Update post
router.put("/:id", authorizeRoles(["psychologist"]), validToken, PostController.updatePost);

// Delete post
router.delete("/:id", authorizeRoles(["psychologist"]), validToken, PostController.deletePost);

module.exports = router;
