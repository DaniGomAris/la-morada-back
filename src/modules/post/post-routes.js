const express = require("express");
const { validToken } = require("../../middlewares/jwt-middleware");
const PostController = require("./post-controller");
const { authorizeRoles } = require("../../middlewares/role-middleware");

const router = express.Router();

// Create post (POST /post/create)
router.post("/create", validToken, authorizeRoles(["psychologist"]), PostController.createPost);

// Get posts (GET /post/)
router.get("/", PostController.getPosts);

// Get posts by id (GET /post/:id)
router.get("/:id", PostController.getPostById);

// Update post (PUT /post/:id)
router.put("/:id", authorizeRoles(["psychologist"]), validToken, PostController.updatePost);

// Delete post (DELETE /post/:id)
router.delete("/:id", authorizeRoles(["psychologist"]), validToken, PostController.deletePost);

module.exports = router;
