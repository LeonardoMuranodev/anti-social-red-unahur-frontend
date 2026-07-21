const { Router } = require('express')
const etiquetasController = require('../controllers/etiquetas.controllers')

const {
    validarEtiquetaSchema,
    validarEtiquetaId
} = require("../middlewares/etiquetas.middlewares")

const router = Router()

router.get('/', etiquetasController.obtenerEtiquetas)
router.get('/:tagId', validarEtiquetaId, etiquetasController.obtenerEtiqueta)
router.post('/', validarEtiquetaSchema,  etiquetasController.crearEtiqueta)
router.put('/:tagId', validarEtiquetaId, validarEtiquetaSchema, etiquetasController.editarEtiqueta)
router.delete('/:tagId', validarEtiquetaId, etiquetasController.eliminarEtiqueta)

module.exports = router