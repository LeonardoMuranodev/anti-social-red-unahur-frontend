const mongoose = require("mongoose")
const Post = require("../models/Post")
const schemaPublicaciones = require("../schema/publicaciones.schema")

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

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: "Id de publicación inválido"
            })
        }

        const publicacion = await Post.findById(id)

        if (!publicacion) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        req.publicacion = publicacion

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