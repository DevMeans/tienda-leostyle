const Router = require("express");
const { check } = require("express-validator");
const { subirImagen } = require("../controllers/uploads");
const { validaridCategoria } = require("../helpers/dbValidators");
const { upload } = require("../middlewares/subirArchivo");
const { validarjwt } = require("../middlewares/validaciones");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post('/', [
    upload
], subirImagen)


router.put('/:models/:idCat', [
    validarjwt,
    check('idCat', 'No es un id valido').notEmpty().isMongoId(),
    check('idCat').custom(validaridCategoria),
    validarCampos,
    upload
], subirImagen)
module.exports = router