const Router = require("express");
const { check } = require("express-validator");
const { crearCategoria, actualizarCategoria } = require("../controllers/Categoria");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post('/', [
    validarjwt
], crearCategoria)
router.put('/:id', [
    validarjwt,
    check('nombre','el nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarCategoria)
module.exports = router