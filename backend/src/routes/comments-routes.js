const { Router } = require('express')
const comentariosController = require('../controllers/comentarios.controllers')

const {
    validarComentario,
    validarComentarioId
} = require("../middlewares/comentarios.middlewares")

const router = Router()

router.get('/', comentariosController.obtenerComentarios)
router.get('/:commentId', validarComentarioId, comentariosController.obtenerComentario)
router.put('/:commentId', validarComentarioId, validarComentario, comentariosController.editarComentario)
router.delete('/:commentId', validarComentarioId, comentariosController.eliminarComentario)

module.exports = router