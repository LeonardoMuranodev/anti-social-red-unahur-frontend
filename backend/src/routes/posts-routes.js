const { Router } = require('express')
const publicacionesController = require('../controllers/posts-controllers')
const postTagsController = require('../controllers/post-tag-controllers')
const postImagesController = require("../controllers/posts-images-controllers")
const comentariosController = require("../controllers/comments-controllers")

//midlewares de Publicacion
const {
    validarPublicacion,
    validarPublicacionId
} = require("../middlewares/posts-middlewares")

//midleware de realacion publicacion-etiquetas
const validarPublicacionIdYEtiquetaId = require("../middlewares/post-tag-midlewares")

// midlewares de imagenes
const {
    validarImagen,
    validarPublicacionEImagenId
} = require("../middlewares/post-images-middlewares")

//midleware de comentario
const {
    validarComentario,
    validarPublicacionYComentarioId
} = require("../middlewares/comment-middlewares")

const { validarUsuarioExistenteEnBody, validarUsuarioId } = require("../middlewares/users-middlewares");

// midleware del multer paara subida de imagenes

const {
    upload,
    validarArchivoExistente
} = require('../middlewares/uploads-middlewares');

const router = Router()

router.get('/', publicacionesController.obtenerPublicaciones)
router.get('/:postId', validarPublicacionId, publicacionesController.obtenerPublicacion)
router.post('/', validarPublicacion, validarUsuarioExistenteEnBody, publicacionesController.crearPublicacion)
router.put('/:postId', validarPublicacion, validarPublicacionId, publicacionesController.editarPublicacion)
router.delete('/:postId', validarPublicacionId, publicacionesController.eliminarPublicacion)

// Relación Post - Tag
router.get('/:postId/etiquetas', validarPublicacionId, postTagsController.obtenerEtiquetasDePost)
router.post('/:postId/etiquetas/:tagId', validarPublicacionIdYEtiquetaId, postTagsController.agregarEtiqueta)
router.delete('/:postId/etiquetas/:tagId', validarPublicacionIdYEtiquetaId, postTagsController.eliminarEtiquetaDePost)

// Relacion Post - Post_Image
router.get('/:postId/imagenes', validarPublicacionId, postImagesController.obtenerImagenesDeUnPost)
router.post('/:postId/imagenes', validarPublicacionId, validarImagen, upload.single('imagen'), validarArchivoExistente, postImagesController.agregarImagenAPost)
router.delete('/:postId/imagenes/:imageId', validarPublicacionEImagenId, postImagesController.eliminarImagen);


// Relacion Post - Comment
router.get('/:postId/comentarios', validarPublicacionId, comentariosController.obtenerComentariosDeUnPost)
router.post('/:postId/comentarios', validarPublicacionId, validarComentario, validarUsuarioExistenteEnBody, comentariosController.crearComentarioEnPost)


//feed
router.get('/feed/:userId', validarUsuarioId, publicacionesController.obtenerFeed) //de seguidores
router.get('/usuario/:userId', validarUsuarioId, publicacionesController.obtenerPublicacionesDelUsuario)

module.exports = router