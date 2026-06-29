const mongoose = require("mongoose")
const Post = require("../models/Post")
const schemaImagen = require("../schema/publicacionImagen.schema")

const validarImagen = (req, res, next) => {

    const { error } = schemaImagen.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

const validarPublicacionEImagenId = async (req, res, next) => {

    try {

        const { postId, imageId } = req.params

        if (
            !mongoose.Types.ObjectId.isValid(postId) ||
            !mongoose.Types.ObjectId.isValid(imageId)
        ) {
            return res.status(400).json({
                mensaje: "Id inválido"
            })
        }

        const publicacion = await Post.findById(postId)

        if (!publicacion) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        const imagen = publicacion.imagenes.find(
            img => img._id.toString() === imageId
        )

        if (!imagen) {
            return res.status(404).json({
                mensaje: "Imagen no encontrada o no pertenece a esta publicación"
            })
        }

        req.publicacion = publicacion
        req.imagen = imagen

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    validarImagen,
    validarPublicacionEImagenId
}