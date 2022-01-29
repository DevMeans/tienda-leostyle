const Router = require("express");
const { login, renovarToken } = require("../controllers/Login");
const { validarjwt } = require("../middlewares/validaciones");
const router = Router();
router.post('/', [], login)
router.get('/renovarToken', [validarjwt], renovarToken)
module.exports = router