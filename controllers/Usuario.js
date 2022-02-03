const { request, response } = require("express")
const Usuario = require("../models/Usuario")
const { generarpwd, generarjwt } = require("../helpers/generadores");
const crearUsuario = async (req = request, res = response) => {
    const { password, estado, rol, ...newBody } = req.body
    newBody.password = generarpwd(password)
    const usuarioDB = new Usuario(newBody)
    const token = await generarjwt(usuarioDB.id)
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
    const { password, estado, rol, ...newBody } = req.body
    if (!password || password == '') {
        delete newBody.password
    } else {
        newBody.password = generarpwd(password)
    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, newBody, { new: true })
    return res.json({
        results: usuarioDB,
        ok: true,
        msg: `Usuario actualizado correctamente`
    })

}
const mostrarUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params
    const [usuarios, total] = await Promise.all([
        Usuario.find().
            skip(desde).
            limit(limite),
        Usuario.count()
    ])
    res.json({
        ok: true,
        results: usuarios,
        total
    })

}
const cambiarEstado = async (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body
    const usuarioDB = await Usuario.findByIdAndUpdate(id, { estado: estado }, { new: true })
    res.json({
        ok: true,
        msg: `se cambio el estado a ${estado}`,
        estado: usuarioDB.estado
    })
}
const EliminarUsuario = async (req = request, res = response) => {
    const { id } = req.params
    const usuarioDB = await Usuario.findByIdAndDelete(id)
    if (!usuarioDB) {
        res.status(400).json({
            ok: false,
            msg: `el usuario no existe`
        })
    }
    res.json({
        ok: true,
        msg: `El usuario se elimino satisfactoriamente`
    })
}
const cambiarRol = async (req = request, res = response) => {
    const { id } = req.params
    const { rol } = req.body
    const usuarioDB = await Usuario.findByIdAndUpdate(id, { rol }, { new: true })
    res.json({
        ok: true,
        msg: `se cambio el rol a ${rol}`,
        estado: usuarioDB.rol
    })
}
module.exports = {
    crearUsuario,
    actualizarUsuario,
    mostrarUsuarios,
    cambiarEstado,
    EliminarUsuario,
    cambiarRol
}