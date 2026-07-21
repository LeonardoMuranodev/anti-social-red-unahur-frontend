const mongoose = require("mongoose")
const Post = require("../models/Post")
const schemaPublicaciones = require("../schema/posts-schema")

const validarPublicacion = (req, res, next) => {

    const { error } = schemaPublicaciones.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

const validarPublicacionId = async (req, res, next) => {

    try {

        const { postId } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        req.post = post

        next()

    } catch (error) {

        return res.status(500).json({
            error: `Hubo un error al validar la publicación: ${error.message}`
        })

    }

}

module.exports = {
    validarPublicacion,
    validarPublicacionId
}