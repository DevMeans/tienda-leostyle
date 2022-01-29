const Router = require("express");
const { check } = require("express-validator");
const { crearUsuario, actualizarUsuario } = require("../controllers/Usuario");
const { validarCorreo } = require("../helpers/dbValidators");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post('/', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('correo','El correo es obligatorio').notEmpty(),
    check('password','la contraseña debe ser obligatoria').notEmpty(),
    check('correo').custom(validarCorreo),
    validarCampos
], crearUsuario)

router.put('/:id', [], actualizarUsuario)
module.exports = router