const { Router } = require('express')
const followController = require('../controllers/follow.controllers')

const {
    validarEsquemaFollow,
    validarUsuarioExistente,
    validarFollowedUser,
    validarConexionExistente,
    validarConexionInexistente
} = require("../middlewares/follows.middlewares")

const router = Router()
router.get('/',followController.obtenerFollows)
router.get('/:user',validarUsuarioExistente, followController.obtenerFollowsDeUser)
router.post('/:user',validarUsuarioExistente, validarEsquemaFollow, validarFollowedUser, validarConexionExistente, followController.crearFollow)
router.delete('/:user',validarUsuarioExistente, validarEsquemaFollow, validarFollowedUser, validarConexionInexistente, followController.eliminarFollow)

module.exports = router