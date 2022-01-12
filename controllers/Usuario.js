const { request, response } = require("express")
const Usuario = require("../models/Usuario")
const { generarpwd } = require("../helpers/generadores");
const crearUsuario = (req = request, res = response) => {
    const { password, estado, ...newBody } = req.body
    newBody.password = generarpwd(password)
    const usuarioDB = new Usuario(newBody)
    usuarioDB.save()
    return res.json({
        results: usuarioDB,
        ok: true,
        msg: `Estas en el crear usuario`
    })
}
const actualizarUsuario = async (req = request, res = response) => {
    const { id } = req.params
    const { password, estado, ...newBody } = req.body
    if (!password) {
        delete newBody.password
    } else {
        newBody.password = generarpwd(password)
    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, newBody)
    return res.json({
        results: usuarioDB,
        ok: true,
        msg: `Usuario actualizado correctamente`
    })

}
module.exports = {
    crearUsuario,
    actualizarUsuario
}