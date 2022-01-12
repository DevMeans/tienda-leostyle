const bcryptjs = require('bcryptjs');
const { response } = require('express');
const validarpwd = (pwdBody, pwdBD) => {
    const validPassword = bcryptjs.compareSync(pwdBody, pwdBD);
    if (!validPassword) {
        return false
    }
    return true
}
module.exports = {
    validarpwd
}