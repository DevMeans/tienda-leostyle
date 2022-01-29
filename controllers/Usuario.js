const { request, response } = require("express")
const Usuario = require("../models/Usuario")
const { generarpwd, generarjwt } = require("../helpers/generadores");
const crearUsuario =  async (req = request, res = response) => {
    const { password, estado,rol, ...newBody } = req.body
    newBody.password = generarpwd(password)
    const usuarioDB = new Usuario(newBody)
    const token =  await generarjwt(usuarioDB.id)
    console.log(usuarioDB.id)
    await usuarioDB.save()
    return res.json({
        results: usuarioDB,
        token,
        ok: true,
        msg: `usuarioCreando`
    })
}
const actualizarUsuario = async (req = request, res = response) => {
    const { id } = req.params
    const { password, estado,rol, ...newBody } = req.body
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