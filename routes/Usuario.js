const Router = require("express");
const { crearUsuario, actualizarUsuario } = require("../controllers/Usuario");
const router = Router();
router.post('/', [], crearUsuario)

router.put('/:id', [], actualizarUsuario)
module.exports = router