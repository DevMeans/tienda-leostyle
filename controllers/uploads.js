const { request, response } = require("express")
const Categoria = require("../models/Categoria")
const Usuario = require("../models/Usuario")
const { subirArchivo } = require('../helpers/subir-archivo')
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
module.exports = {
    subirImagen,
    expressFileUploads
}