import { Router } from 'express';
import { followController } from '../controllers/follow-controller.js';
import {     
    validateFollowSchema,     
    validateExistingUser,     
    validarFollowedUser,     
    validateExistingConnection,     
    validateNonExistingConnection 
} from "../middlewares/follow-middlewares.js";

export const router = Router();

router.get('/', followController.obtenerFollows);
router.get('/:userId', validateExistingUser, followController.obtenerFollowsDeUser);
router.post('/:userId', validateExistingUser, validateFollowSchema, validarFollowedUser, validateExistingConnection, followController.crearFollow);
router.delete('/:userId', validateExistingUser, validateFollowSchema, validarFollowedUser, validateNonExistingConnection, followController.eliminarFollow);