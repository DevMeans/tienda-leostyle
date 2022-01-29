
const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    correo: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique:true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol:{
        type:String,
        default:'INVITADO_ROLE'
    }


}, { timestamps: true })

usuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario
}
module.exports = model('Usuario', usuarioSchema)