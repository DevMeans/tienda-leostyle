const { request, response } = require("express")
const Categoria = require("../models/Categoria")

const crearCategoria = async (req = request, res = response) => {
    const { usuario, estado, ...newBody } = req.body
    newBody.usuario = req.uid
    const CategoriaDB = new Categoria(newBody)
    await CategoriaDB.save()
    return res.json({
        resutls: CategoriaDB,
        ok: true,
        msg: `Se ah creado la categoria`
    })
}
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params
    const { usuario, estado, ...newBody } = req.body
    newBody.usuario = req.uid
    const CategoriaDB = await Categoria.findByIdAndUpdate(id, newBody, { new: true })
    return res.json({
        results: CategoriaDB,
        ok: true,
        msg: `Categoria actualizada correctamente`
    })
}

module.exports = {
    crearCategoria,
    actualizarCategoria

}