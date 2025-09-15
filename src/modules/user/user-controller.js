const { registerUser, getUsers } = require("./user-service");
const { handleError } = require("../../handlers/error-handler");

async function registerUserController(req, res) {
  try {
    const user = await registerUser(req.body);
    const { password, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      status: "ok",
      message: "Usuario creado exitosamente",
      user: userWithoutPassword,
    });
  } catch (err) {
    return handleError(res, err);
  }
}

async function getUsersController(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json({
      success: true,
      status: "ok",
      users,
    });
  } catch (err) {
    return handleError(res, err);
  }
}

module.exports = {
  registerUserController,
  getUsersController,
};
