const Router = require("express");
const { check } = require("express-validator");
const { crearCategoria, actualizarCategoria } = require("../controllers/Categoria");
const { validaridCategoria } = require("../helpers/dbValidators");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post('/', [
    validarjwt
], crearCategoria)
router.put('/:id', [
    validarjwt,
    check('id').custom(validaridCategoria),
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarCategoria)
module.exports = router