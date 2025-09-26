const { handleError } = require("../handlers/error-handler");

// Middleware to authorize a valid roles
function authorizeRoles(roles = []) {
  return (req, res, next) => {
    try {
      // Verify that user staying in a active session
      if (!req.user) {
        const err = new Error("UNAUTHORIZED");
        return handleError(res, err);
      }

      // Verify that the user role is among the valid roles.
      if (!roles.includes(req.user.role)) {
        const err = new Error("ACCESS DENIED");
        return handleError(res, err);
      }

      next();
    } catch (err) {
      handleError(res, err);
    }
  };
}

module.exports = { authorizeRoles };
