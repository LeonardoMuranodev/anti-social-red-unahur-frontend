import { Router } from 'express';
import { userController } from '../controllers/user-controller.js';
import {     
    validateUserSchema,     
    validateUserId,     
    validateUserExistsInBody,     
    validateUserPassword 
} from "../middlewares/user-middlewares.js";

export const router = Router();

router.get('/', userController.obtenerUsuarios);
router.get('/:userId', validateUserId, userController.obtenerUsuario);
router.post('/', validateUserSchema, userController.crearUsuario);
router.put('/:userId', validateUserId, validateUserSchema, userController.editarUsuario);
router.delete('/:userId', validateUserId, userController.eliminarUsuario);

// Para el front
router.post('/login', validateUserSchema, validateUserExistsInBody, validateUserPassword, userController.loginUsuario);