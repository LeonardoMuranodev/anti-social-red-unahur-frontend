import { Router } from 'express';
import { postController } from '../controllers/post-controller.js';
import { postTagController } from '../controllers/post-tag-controller.js';
import { postImageController } from "../controllers/post-image-controller.js";
import { commentController } from "../controllers/comment-controller.js";

// Middlewares de Publicación
import {     
    validatePost,     
    validatePostId 
} from "../middlewares/post-middlewares.js";

// Middleware de relación publicación-etiquetas
import { validatePostAndTagId } from "../middlewares/post-tag-middlewares.js";

// Middlewares de imágenes
import {     
    validateImage,     
    validatePostAndImageId 
} from "../middlewares/post-image-middlewares.js";

// Middleware de comentario
import {     
    validateComment,     
    validatePostAndCommentId 
} from "../middlewares/comment-middlewares.js";

import { 
    validateUserExistsInBody, 
    validateUserId 
} from "../middlewares/user-middlewares.js";

// Middleware de multer para subida de imágenes
import {     
    upload,     
    validateExistingFile 
} from '../middlewares/uploads-middlewares.js';

export const router = Router();

router.get('/', postController.obtenerPublicaciones);
router.get('/:postId', validatePostId, postController.obtenerPublicacion);
router.post('/', validatePost, validateUserExistsInBody, postController.crearPublicacion);
router.put('/:postId', validatePost, validatePostId, postController.editarPublicacion);
router.delete('/:postId', validatePostId, postController.eliminarPublicacion);

// Relación Post - Tag
router.get('/:postId/etiquetas', validatePostId, postTagController.obtenerEtiquetasDePost);
router.post('/:postId/etiquetas/:tagId', validatePostAndTagId, postTagController.agregarEtiqueta);
router.delete('/:postId/etiquetas/:tagId', validatePostAndTagId, postTagController.eliminarEtiquetaDePost);

// Relación Post - Post_Image
router.get('/:postId/imagenes', validatePostId, postImageController.obtenerImagenesDeUnPost);
router.post('/:postId/imagenes', validatePostId, validateImage, upload.single('imagen'), validateExistingFile, postImageController.agregarImagenAPost);
router.delete('/:postId/imagenes/:imageId', validatePostAndImageId, postImageController.eliminarImagen);

// Relación Post - Comment
router.get('/:postId/comentarios', validatePostId, commentController.obtenerComentariosDeUnPost);
router.post('/:postId/comentarios', validatePostId, validateCommentId, validateUserExistsInBody, commentController.crearComentarioEnPost);

// Feed
router.get('/feed/:userId', validateUserId, postController.obtenerFeed);

// De seguidores
router.get('/usuario/:userId', validateUserId, postController.obtenerPublicacionesDelUsuario);