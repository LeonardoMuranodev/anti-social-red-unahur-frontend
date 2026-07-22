import { Router } from 'express';
import { commentController } from '../controllers/comment-controller.js';
import { validateComment, validateCommentId } from '../middlewares/comment-middlewares.js';

export const router = Router();

router.get('/', commentController.obtenerComentarios);
router.get('/:commentId', validateCommentId, commentController.obtenerComentario);
router.put('/:commentId', validateCommentId, validateComment, commentController.editarComentario);
router.delete('/:commentId', validateCommentId, commentController.eliminarComentario);