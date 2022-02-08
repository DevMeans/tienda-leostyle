const { request, response } = require("express")
const Producto = require("../models/Producto")

const crearProductos = (req = request, res = response) => {
    const { estado, usuario, categoria, ...newBody } = req.body
    const categoriaDB = new Producto(newBody)
    console.log(categoriaDB)
    res.json({
        ok: true,
        msg: `se creo categoria`,
        results: categoriaDB
    })
}
module.exports = {
    crearProductos
}