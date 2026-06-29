const mongoose = require("mongoose")
const Tag = require("../models/Tag")
const Post = require("../models/Post")

const validarPublicacionIdYEtiquetaId = async (req, res, next) => {

    try {

        const { postId, tagId } = req.params

        if (
            !mongoose.Types.ObjectId.isValid(postId) ||
            !mongoose.Types.ObjectId.isValid(tagId)
        ) {
            return res.status(400).json({
                mensaje: "Id inválido"
            })
        }

        const etiqueta = await Tag.findById(tagId)

        if (!etiqueta) {
            return res.status(404).json({
                mensaje: "Etiqueta no encontrada"
            })
        }

        const publicacion = await Post.findById(postId)

        if (!publicacion) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        req.etiqueta = etiqueta
        req.publicacion = publicacion

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = validarPublicacionIdYEtiquetaId