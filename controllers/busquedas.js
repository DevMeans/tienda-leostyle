const { request, response } = require("express")
const Categoria = require("../models/Categoria")
const Usuario = require("../models/Usuario")
const buscarPorColeccion = async (req = request, res = response) => {
    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i')
    let data = []

    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            res.json({
                ok: true,
                results: data
            })
            break;
        case 'categorias':
            data = await Categoria.find({ nombre: regex })
            res.json({
                ok: true,
                results: data
            })
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'No se contemplo esta busqueda'
            })
    }

}
module.exports = {
    buscarPorColeccion
}