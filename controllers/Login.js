const { request, response } = require("express")
const { generarjwt } = require("../helpers/generadores")
const { validarpwd } = require("../helpers/ValidacionesEx")

const Usuario = require("../models/Usuario")

const login = async (req = request, res = response) => {
    const { correo, password } = req.body
    const usuarioAuth = await Usuario.findOne({ correo })
    compararpwd = validarpwd(password, usuarioAuth.password)
    if (!compararpwd) {
        return res.status(403).json({
            ok: false,
            msg: `contraseña no valida`
        })
    }
    const jwt = await generarjwt(usuarioAuth.id)
    return res.json({
        ok: true,
        msg: `Correo encontrado`,
        jwt
    })
}
module.exports = {
    login
}