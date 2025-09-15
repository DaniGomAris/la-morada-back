const { registerUser, getUsers, updateUser } = require("./user-service");
const { handleError } = require("../../handlers/error-handler");

// Crear usuario
async function registerUserController(req, res) {
  try {
    const { password, rePassword, ...rest } = req.body;

    // Validar que coincidan password y rePassword
    if (password !== rePassword) {
      return res.status(400).json({ success: false, message: "Las contraseñas no coinciden" });
    }

    const user = await registerUser({ ...rest, password });
    res.status(201).json({
      success: true,
      status: "ok",
      message: "Usuario creado exitosamente",
      user,
    });
  } catch (err) {
    return handleError(res, err);
  }
}

// Actualizar usuario
async function updateUserController(req, res) {
  try {
    const userId = req.params.id;
    const { password, rePassword, ...rest } = req.body;

    // Validar que coincidan si se actualiza contraseña
    if (password && password !== rePassword) {
      return res.status(400).json({ success: false, message: "Las contraseñas no coinciden" });
    }

    const updates = { ...rest };
    if (password) updates.password = password;

    const updatedUser = await updateUser(userId, updates);
    res.status(200).json({
      success: true,
      message: "Usuario actualizado correctamente",
      user: updatedUser
    });
  } catch (err) {
    return handleError(res, err);
  }
}

// Obtener usuarios
async function getUsersController(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json({ success: true, status: "ok", users });
  } catch (err) {
    return handleError(res, err);
  }
}

module.exports = {
  registerUserController,
  updateUserController,
  getUsersController,
};
