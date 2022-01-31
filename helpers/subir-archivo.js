const { request, response } = require("express")
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const subirArchivo = (files, extencionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { img } = files
        const nombreCortado = img.name.split('.')
        const extencion = nombreCortado[nombreCortado.length - 1]
        if (!extencionesPermitidas.includes(extencion)) {
            reject(`la extencion ${extencion} no es permitida :  ${extencionesPermitidas}`)
        }
        const nombreTemp = `${uuidv4()}.${extencion}`
        uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp)

        // Use the mv() method to place the file somewhere on your server
        img.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(nombreTemp)
        });
    })
}

module.exports = {
    subirArchivo
}