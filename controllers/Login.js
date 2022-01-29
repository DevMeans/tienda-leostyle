const { request, response } = require("express")
const { generarjwt } = require("../helpers/generadores")
const { validarpwd } = require("../helpers/ValidacionesEx")

const Usuario = require("../models/Usuario")

const login = async (req = request, res = response) => {
    const { correo, password } = req.body
    const usuarioAuth = await Usuario.findOne({ correo:correo })
    console.log(usuarioAuth)
    if(!usuarioAuth){
        return res.status(400).json({
            ok:false,
            msg:`el correo ${ correo } no fue encontrado`
        })
    }
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
        token:jwt
    })
}
const renovarToken = async (req = request, res = response) => {
    const id = req.uid
    //console.log(id)
    const token = await generarjwt(id)
    res.json({
        ok: true,
        msg: 'Estas en el renovar token',
        token
    })
}
module.exports = {
    login,
    renovarToken
}