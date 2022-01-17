const { request, response } = require("express")
const Categoria = require("../models/Categoria")
const Usuario = require("../models/Usuario")
const subirImagen = async (req = request, res = response) => {
    const { models, idCat } = req.params

    const url = req.files[0].path
    const usuario = req.uid
    data = {
        img: url,
        usuario: usuario
    }
    console.log(req.files[0].path)
    console.log(req.files)
    let categoriaDb
    switch (models) {
        case 'categoria':
            categoriaDb = await Categoria.findByIdAndUpdate(idCat, data, { new: true })
            break;

        default:
            break;
    }
   return res.json({
        results:categoriaDb,
        ok: false,
        msg: `estas en el subit archivo`
    })
}
module.exports = {
    subirImagen
}