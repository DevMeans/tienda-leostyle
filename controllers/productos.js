const { request, response } = require("express")
const Producto = require("../models/Producto")

const crearProductos = async (req = request, res = response) => {
    const { estado, usuario, ...newBody } = req.body
    newBody.usuario = req.uid
    const productoDB = new Producto(newBody)
    await productoDB.save()
    res.json({
        ok: true,
        msg: `se creo categoria`,
        results: productoDB
    })
}
const actualizarProductos = async (req = request, res = response) => {
    const { id } = req.params
    const { estado, usuario, ...newBody } = req.body
    newBody.usuario = req.uid
    const productoDB = await Producto.findByIdAndUpdate(id, newBody, { new: true })
    res.json({
        ok: true,
        results: productoDB,
        msg:`categoria actualizada correctamente`
    })
}
const actualizadaEstadoProducto = async(req = request, res = response)=>{
    const { id } = req.params
    const { estado } = req.body
    data = {
        estado,
        usuario: req.uid
    }
    const ProductoDB = await Producto.findByIdAndUpdate(id, data, { new: true })
    return res.json({
        ok: true,
        ProductoDB,
        msg: `Categoria actualizada correctamente`
    })
}

const eliminarProducto = async (req = request, res = response)=>{
    const { id } = req.params
    const ProductoDB = await Producto.findByIdAndDelete(id)
    res.json({
        ok:true,
        results:ProductoDB
    })
}
const mostrarProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params
    const [usuarios, total] = await Promise.all([
        Producto.find().
            skip(desde).
            limit(limite),
        Producto.count()
    ])
    res.json({
        ok: true,
        results: usuarios,
        total
    })
}
module.exports = {
    crearProductos,
    mostrarProductos,
    actualizarProductos,
    actualizadaEstadoProducto,
    eliminarProducto
}