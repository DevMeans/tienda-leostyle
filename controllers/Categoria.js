const { request, response } = require("express")
const Categoria = require("../models/Categoria")

const crearCategoria = async (req = request, res = response) => {
    const { usuario, estado, ...newBody } = req.body
    newBody.usuario=req.uid
    const CategoriaDB= new Categoria(newBody)
    await CategoriaDB.save()
    return res.json({
        resutls:CategoriaDB,
        ok:true,
        msg:`Se ah creado la categoria`
    })
}
module.exports = {
    crearCategoria
}