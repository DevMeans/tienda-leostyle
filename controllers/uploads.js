const { request, response } = require("express")
const Categoria = require("../models/Categoria")
const Usuario = require("../models/Usuario")
const { subirArchivo } = require('../helpers/subir-archivo')
const path = require('path')
const fs = require('fs')
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const subirImagen = async (req = request, res = response) => {

}
const expressFileUploads = async (req = request, res = response) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir'
        });
    }

    try {
        const pathCompleto = await subirArchivo(req.files, ['jpg'], 'textos')
        res.json({
            path: pathCompleto
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
const actualizarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params
    let modelo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir'
        });
    }
    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'categoria':
            modelo = await Categoria.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe la categoria con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'Aun no se programa esa accion' })
    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }

    const nombre = await subirArchivo(req.files, ['jpg', 'mp4'], 'categoria')
    modelo.img = nombre
    await modelo.save()
    res.json(modelo)

}
const actualizarImagenCloudynary = async (req = request, res = response) => {
    const { id, coleccion } = req.params
    let modelo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir'
        });
    }
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    ok: false,
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'categorias':
            modelo = await Categoria.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    ok: false,
                    msg: `No existe la categoria con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                ok: false,
                msg: 'Aun no se programa esa accion'
            })
    }

    if (modelo.img) {
        const nombrearr = modelo.img.split('/');
        const nombre = nombrearr[nombrearr.length - 1]
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id)
    }
    const extencionesPermitidas = ['png', 'jpg', 'jpeg', 'gif']
    const { tempFilePath } = req.files.img
    console.log()
    const extValida = req.files.img.mimetype.split('/')[1]
    if (extencionesPermitidas.includes(extValida)) {
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        modelo.img = secure_url
        await modelo.save();
        res.json({
            ok: true,
            results: modelo
        })
    } else {
        res.status(403).json({
            ok: false,
            msg: `solo se permiten archivos ${extencionesPermitidas}`
        })
    }

}


module.exports = {
    subirImagen,
    expressFileUploads,
    actualizarImagen,
    actualizarImagenCloudynary
}