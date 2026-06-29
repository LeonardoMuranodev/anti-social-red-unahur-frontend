const Post = require("../models/Post")

const agregarImagenAPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Agregar una imagen a una publicación'
    */

    try {

        const publicacion = req.publicacion

        const imageUrl = `/uploads/${req.file.filename}`

        publicacion.imagenes.push({
            url: imageUrl
        })

        await publicacion.save()

        res.status(201).json({
            mensaje: "Imagen agregada correctamente",
            publicacion_id: publicacion._id,
            nueva_imagen: imageUrl
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error a la hora de crear la imagen: ${error.message}`
        })

    }
}

const obtenerImagenesDeUnPost = async (req, res) => {

    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Obtener todas las imágenes de una publicación'
    */

    try {

        const publicacion = req.publicacion

        const imagenes = publicacion.imagenes.map(i => ({
            id: i._id,
            url: i.url
        }))

        res.status(200).json({
            imagenes: imagenes
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error a la hora de obtener las imágenes: ${error.message}`
        })

    }

}

const eliminarImagen = async (req, res) => {

    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Eliminar una imagen de una publicación'
    */

    try {

        const publicacion = req.publicacion
        const { imageId } = req.params

        publicacion.imagenes = publicacion.imagenes.filter(
            imagen => imagen._id.toString() !== imageId
        )

        await publicacion.save()

        res.status(200).json({
            mensaje: "Imagen eliminada con éxito"
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error a la hora de eliminar la imagen: ${error.message}`
        })

    }

}

module.exports = {
    agregarImagenAPost,
    obtenerImagenesDeUnPost,
    eliminarImagen
}