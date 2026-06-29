const mongoose = require("mongoose")
const Comment = require("../models/Comment")
const schemaComentarios = require("../schema/comentarios.schema")

const validarComentario = (req, res, next) => {

    const { error } = schemaComentarios.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

const validarComentarioId = async (req, res, next) => {

    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: "Id de comentario inválido"
            })
        }

        const comentario = await Comment.findById(id)

        if (!comentario) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado"
            })
        }

        await comentario.populate("user_nickname", "nickname");
        await comentario.populate("post_id", "_id");
        
        const comentarioFormateado = {
            _id: comentario._id,
            text: comentario.text,
            is_visible: comentario.is_visible,
            user_nickname: comentario.user_nickname,
            post_id: comentario.post_id
        };

        req.comentario = comentarioFormateado

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const validarPublicacionYComentarioId = async (req, res, next) => {

    try {

        const { postId, comentarioId } = req.params

        if (
            !mongoose.Types.ObjectId.isValid(postId) ||
            !mongoose.Types.ObjectId.isValid(comentarioId)
        ) {
            return res.status(400).json({
                mensaje: "Id inválido"
            })
        }

        const comentario = await Comment.findOne({
            _id: comentarioId,
            post_id: postId
        })

        if (!comentario) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado o no pertenece a ese post"
            })
        }

        req.comentario = comentario

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

module.exports = {
    validarComentario,
    validarComentarioId,
    validarPublicacionYComentarioId
}