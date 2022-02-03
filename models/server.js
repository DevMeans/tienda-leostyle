const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { ConexionMongoDB } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.rutas = {
            usuario: '/api/usuario',
            auth: '/api/auth/login',
            categoria: '/api/categoria',
            uploads: '/api/subirimagen',
            busqueda: '/api/busqueda'
        }
        this.cnnMongo()
        this.middlewares()
        this.routes()
    }
    async cnnMongo() {
        await ConexionMongoDB()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.rutas.usuario, require('../routes/Usuario'))
        this.app.use(this.rutas.auth, require('../routes/Auth'))
        this.app.use(this.rutas.categoria, require('../routes/Categoria'))
        this.app.use(this.rutas.uploads, require("../routes/uploads"))
        this.app.use(this.rutas.busqueda, require('../routes/busqueda'))
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Estamos en el puerto :  ${this.port}!`))
    }
}
module.exports = {
    Server
}