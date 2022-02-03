const Router = require("express");
const { check } = require("express-validator");
const { crearUsuario, actualizarUsuario, mostrarUsuarios, cambiarEstado, EliminarUsuario, cambiarRol } = require("../controllers/Usuario");
const { validarCorreo, validaridUsuario } = require("../helpers/dbValidators");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.get('/:desde/:limite', [
    validarjwt,
    validarCampos

],
    mostrarUsuarios
)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('password', 'la contraseña debe ser obligatoria').notEmpty(),
    check('correo').custom(validarCorreo),
    validarCampos
], crearUsuario)

router.put('/:id', [
    validarjwt,
    check('id', 'El id no es valido').isMongoId(),
    check('correo').custom(validarCorreo),
    validarCampos

], actualizarUsuario)
router.put('/estado/:id', [
    validarjwt,
    check('id').custom(validaridUsuario),
    validarCampos
],
    cambiarEstado)
router.put('/rol/:id', [
    validarjwt,
    check('id').custom(validaridUsuario),
    validarCampos
],
    cambiarRol)
router.delete('/:id', [
    validarjwt,
    check('id').custom(validaridUsuario),

    validarCampos
], EliminarUsuario)
module.exports = router