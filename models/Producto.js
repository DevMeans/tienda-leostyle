const { Schema, model } = require('mongoose');
const productoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: Array,
        default: ['https://static.zerochan.net/Lumine.%28Genshin.Impact%29.full.3133637.jpg']
    },
    estado: {
        type: Boolean,
        default: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        default: ''
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    categoria: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }

}, { timestamps: true })

productoSchema.methods.toJSON = function () {
    const { __v, _id, ...producto } = this.toObject();
    producto.uid = _id
    return producto
}
module.exports = model('Producto', productoSchema)