const express = require("express");
const { validToken } = require("../../middlewares/jwt-middleware");
const PostController = require("./post-controller");
const { authorizeRoles } = require("../../middlewares/role-middleware");

const router = express.Router();

// Crear un post
router.post("/create", validToken, authorizeRoles(["psychologist"]), PostController.createPost);

// Obtener todos los posts
router.get("/", PostController.getPosts);

// Obtener post por ID
router.get("/:id", PostController.getPostById);

// Actualizar post
router.put("/:id", authorizeRoles(["psychologist"]), validToken, PostController.updatePost);

// Eliminar post
router.delete("/:id", authorizeRoles(["psychologist"]), validToken, PostController.deletePost);

module.exports = router;
