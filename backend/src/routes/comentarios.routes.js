const { Router } = require('express')
const comentariosController = require('../controllers/comentarios.controllers')

const {
    validarComentario,
    validarComentarioId
} = require("../middlewares/comentarios.middlewares")

const router = Router()

router.get('/', comentariosController.obtenerComentarios)
router.get('/:id', validarComentarioId, comentariosController.obtenerComentario)
router.put('/:id', validarComentarioId, validarComentario, comentariosController.editarComentario)
router.delete('/:id', validarComentarioId, comentariosController.eliminarComentario)

module.exports = router