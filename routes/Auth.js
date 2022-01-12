const Router = require("express");
const { login } = require("../controllers/Login");
const router = Router();
router.post('/', [], login)
module.exports = router