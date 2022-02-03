const Router = require("express");
const { check } = require("express-validator");
const { buscarPorColeccion } = require("../controllers/busquedas");
const { coleccionesPermitidas } = require("../helpers/dbValidators");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.get('/:tabla/:busqueda', [
    validarjwt,
    check('tabla').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'categorias'])),
    validarCampos
], buscarPorColeccion)
module.exports = router