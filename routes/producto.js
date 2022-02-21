const Router = require("express");
const { check } = require("express-validator");
const { crearProductos, mostrarProductos } = require("../controllers/productos");
const { validarNombreProducto } = require("../helpers/dbValidators");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/:desde/:limite', [

    /*validarjwt,
    validarCampos*/

], mostrarProductos)
router.post('/', [
    validarjwt,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(validarNombreProducto),
    check('categoria', 'La categoria es obligatoria y debe ser ver valida').notEmpty().isMongoId(),
    validarCampos
], crearProductos)
module.exports = router