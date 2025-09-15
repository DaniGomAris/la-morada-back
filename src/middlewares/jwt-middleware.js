const { verifyToken } = require("../auth/jwt-auth");

// Middleware para limitar ruta usando un JWT valido
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Token requerido");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) throw new Error("Token inválido");

    req.user = { user_id: decoded.user_id, role: decoded.role };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticateJWT };
