const { registerUser, getPatientUsers, getPsychologistUsers, updateUser } = require("./user-service");
const { handleError } = require("../../handlers/error-handler");

// Crear usuario
async function registerUserController(req, res) {
  try {
    const { password, rePassword, ...rest } = req.body;

    if (password !== rePassword) throw new Error("PASSWORD_MISMATCH");

    const user = await registerUser({ ...rest, password });
    res.status(201).json({
      success: true,
      status: "ok",
      message: "Usuario creado exitosamente",
      user,
    });
  } catch (err) {
    handleError(res, err);
  }
}

// Actualizar usuario
async function updateUserController(req, res) {
  try {
    const userId = req.params.id;
    const { password, rePassword, ...rest } = req.body;

    if (password && password !== rePassword) throw new Error("PASSWORD_MISMATCH");

    const updates = { ...rest };
    if (password) updates.password = password;

    const updatedUser = await updateUser(userId, updates);
    res.status(200).json({
      success: true,
      message: "Usuario actualizado correctamente",
      user: updatedUser
    });
  } catch (err) {
    handleError(res, err);
  }
}

// Obtener usuarios con rol patient
async function getPatientUsersController(req, res) {
  try {
    const users = await getPatientUsers();
    res.status(200).json({ success: true, status: "ok", users });
  } catch (err) {
    handleError(res, err);
  }
}

// Obtener usuarios con rol psychologist
async function getPsychologistUsersController(req, res) {
  try {
    const users = await getPsychologistUsers();
    res.status(200).json({ success: true, status: "ok", users });
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = {
  registerUserController,
  updateUserController,
  getPatientUsersController,
  getPsychologistUsersController
};
