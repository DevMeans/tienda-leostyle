const Router = require("express");
const { check } = require("express-validator");
const { crearCategoria, actualizarCategoria, MostrarCategorias, actualizarEstadoCategoria, eliminarCategiria } = require("../controllers/Categoria");
const { validaridCategoria } = require("../helpers/dbValidators");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.get('/:desde/:limite', [
    validarjwt,
    validarCampos
],
    MostrarCategorias
)
router.put('/estado/:id', [
    validarjwt,
    check('id').custom(validaridCategoria),
    validarCampos
],
    actualizarEstadoCategoria)
router.post('/', [
    validarjwt,
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)
router.put('/:id', [
    validarjwt,
    check('id').custom(validaridCategoria),
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarCategoria)
router.delete('/:id', [
    validarjwt,
    check('id').custom(validaridCategoria),
    validarCampos
],
    eliminarCategiria)
module.exports = router