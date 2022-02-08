const Router = require("express");
const { crearProductos } = require("../controllers/productos");

const router = Router();
router.post('/', [


], crearProductos)
module.exports = router