const { verifyToken } = require("../auth/jwt-auth");

// Autenticar jwt
function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ success: false, error: "Token inválido o expirado" });
  }

  req.user = {
    user_id: decoded.user_id,
    role: decoded.role,
  };

  next();
}

module.exports = { authenticateJWT };
