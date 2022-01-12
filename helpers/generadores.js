const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const generarpwd = (password = '') => {
    const salt = bcrypt.genSaltSync(10);
    const pwdEcript = bcrypt.hashSync(password, salt);
    return pwdEcript
}
const generarjwt = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {//probar como valiable de entorno con hekoru
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('no se pudo generar token')
            } else {
                resolve(token)
            }
        })
    }
    )
}

module.exports = {
    generarpwd,
    generarjwt
}