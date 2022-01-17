const Categoria = require("../models/Categoria")
const Usuario = require("../models/Usuario")


const validaridCategoria = async (id = '') => {
    const existeId = await Categoria.findById(id)
    if (!existeId) {
        throw new Error(`el id ${id} no existe ne la base de datos`)
    }
}
module.exports = {
    validaridCategoria
}