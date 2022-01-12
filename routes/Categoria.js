const Router = require("express");
const { crearCategoria } = require("../controllers/Categoria");
const { validarjwt } = require("../middlewares/validaciones");
const router = Router();
router.post('/', [
    validarjwt
], crearCategoria)


module.exports = router