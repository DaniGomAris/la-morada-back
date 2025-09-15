// Middleware para limitar ruta usando un rol valido
function authorizeRoles(roles = []) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error("No autenticado");
      }

      if (!roles.includes(req.user.role)) {
        throw new Error("No autorizado");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { authorizeRoles };
