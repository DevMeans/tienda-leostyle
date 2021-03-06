const Router = require("express");
const { check } = require("express-validator");
const { actImagenCloudynaryProd } = require("../controllers/uploadProducto");
const { subirImagen, expressFileUploads, actualizarImagen, actualizarImagenCloudynary } = require("../controllers/uploads");
const { validaridCategoria, coleccionesPermitidas } = require("../helpers/dbValidators");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post('/', [

], expressFileUploads)
router.put('/:coleccion/:id', [
    validarjwt,
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'categorias'])),
    validarCampos
], actualizarImagenCloudynary)
router.put('/:id', [],
    actImagenCloudynaryProd
)
/*
router.put('/:models/:idCat', [
    validarjwt,
    check('idCat', 'No es un id valido').notEmpty().isMongoId(),
    check('idCat').custom(validaridCategoria),
    validarCampos,
    upload
], subirImagen)*/
module.exports = router