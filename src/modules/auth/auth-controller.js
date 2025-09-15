const { loginUser } = require("../auth/auth-service");

async function login(req, res) {
    const { email, password } = req.body;
    return loginUser(email, password, res);
} 

module.exports = { login };
