const { request, response } = require("express")
const Categoria = require("../models/Categoria")

const crearCategoria = async (req = request, res = response) => {
    const { usuario, estado, ...newBody } = req.body
    newBody.usuario = req.uid
    const CategoriaDB = new Categoria(newBody)
    await CategoriaDB.save()
    return res.json({
        results: CategoriaDB,
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
const actualizarEstadoCategoria = async (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body
    data = {
        estado,
        usuario: req.uid
    }
    const CategoriaDB = await Categoria.findByIdAndUpdate(id, data, { new: true })
    return res.json({
        ok: true,
        msg: `Categoria actualizada correctamente`
    })

}
const MostrarCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params
    const [usuarios, total] = await Promise.all([
        Categoria.find().
            skip(desde).
            limit(limite),
        Categoria.count()
    ])
    res.json({
        ok: true,
        results: usuarios,
        total
    })
}
const eliminarCategiria = async (req = request, res = response)=>{
    const { id } = req.params
    const categoriaDB = await Categoria.findByIdAndDelete(id)
    res.json({
        ok:true,
        results:categoriaDB
    })
}

module.exports = {
    crearCategoria,
    actualizarCategoria,
    MostrarCategorias,
    actualizarEstadoCategoria,
    eliminarCategiria

}