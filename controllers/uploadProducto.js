const Producto = require("../models/Producto");
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const actImagenCloudynaryProd = async (req = request, res = response) => {
    const { id, coleccion } = req.params
    let modelo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir'
        });
    }
    const imgIndex = await Producto.findById(id)
    if (!imgIndex) {
        return res.status(400).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`
        })
    }
    //https://res.cloudinary.com/personal-proyect/image/upload/v1644372658/ogu76wf0blz53p73lgu3.jpg
    res.json({
        ok: true,
        imgIndex
    })
    //console.log(req.files.img)

    const arrayFiles = req.files.img
    const extencionesPermitidas = ['png', 'jpg', 'jpeg', 'gif']


    //if (req.files.img.length != undefined) 
}
module.exports = {
    actImagenCloudynaryProd
}