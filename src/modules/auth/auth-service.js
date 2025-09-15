const User = require("../user/models/user");
const { validateLogin, validatePassword, validateRole } = require("./validators/auth-validator");
const { generateToken } = require("../../auth/jwt-auth");
const { handleError } = require("../../handlers/error-handler")
async function loginUser(email, password, res) {
    try {
        // Validar credenciales
        validateLogin(email, password);

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Validar contraseña y rol
        await validatePassword(user.password, password);
        validateRole(user.role, ["user", "admin"]);

        // Preparar objeto de usuario sin la contraseña
        const { password: _, ...userWithoutPassword } = user.toObject();

        // Generar JWT
        const token = generateToken(user._id.toString(), user.role);

        // Seleccionar solo los campos que quieres enviar
        const safeUser = {
        _id: userWithoutPassword._id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        role: userWithoutPassword.role
        };

        return res.status(200).json({
        success: true,
        status: "ok",
        message: "Login exitoso",
        user: safeUser,
        token
        });

    } catch (err) {
        console.error(err);
        return handleError(res, err);
    }
}

module.exports = { loginUser };
