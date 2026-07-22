import { Router } from 'express';
import { tagController } from '../controllers/tag-controller.js';
import {     
    validateTagSchema,     
    validateTagId 
} from "../middlewares/tag-middlewares.js";

export const router = Router();

router.get('/', tagController.obtenerEtiquetas);
router.get('/:tagId', validateTagId, tagController.obtenerEtiqueta);
router.post('/', validateTagSchema, tagController.crearEtiqueta);
router.put('/:tagId', validateTagId, validateTagSchema, tagController.editarEtiqueta);
router.delete('/:tagId', validateTagId, tagController.eliminarEtiqueta);