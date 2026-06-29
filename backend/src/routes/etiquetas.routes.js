const { Router } = require('express')
const etiquetasController = require('../controllers/etiquetas.controllers')

const {
    validarEtiquetaSchema,
    validarEtiquetaId
} = require("../middlewares/etiquetas.middlewares")

const router = Router()

router.get('/', etiquetasController.obtenerEtiquetas)
router.get('/:id', validarEtiquetaId, etiquetasController.obtenerEtiqueta)
router.post('/', validarEtiquetaSchema,  etiquetasController.crearEtiqueta)
router.put('/:id', validarEtiquetaId, validarEtiquetaSchema, etiquetasController.editarEtiqueta)
router.delete('/:id', validarEtiquetaId, etiquetasController.eliminarEtiqueta)

module.exports = router