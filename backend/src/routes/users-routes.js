const { Router } = require('express')
const usuariosController = require('../controllers/usuarios.controllers')

const {
    validarUsuarioSchema,
    validarUsuarioId,
    validarUsuarioExistenteEnBody,
    validarContraseniaDeUsuario
} = require("../middlewares/usuarios.middlewares")

const router = Router()

router.get('/', usuariosController.obtenerUsuarios)
router.get('/:userId', validarUsuarioId, usuariosController.obtenerUsuario)
router.post('/', validarUsuarioSchema, usuariosController.crearUsuario)
router.put('/:userId', validarUsuarioId, validarUsuarioSchema, usuariosController.editarUsuario)
router.delete('/:userId', validarUsuarioId, usuariosController.eliminarUsuario)


//para el front
router.post('/login', validarUsuarioSchema, validarUsuarioExistenteEnBody, validarContraseniaDeUsuario, usuariosController.loginUsuario)


module.exports = router