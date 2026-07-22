import {mongoose} from "mongoose"
import Comment from "../models/Comment.js"
import {commentSchema} from "../schema/comments-schema.js"

export const validateComment = (req, res, next) => {

    const { error } = commentSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

export const validateCommentId = async (req, res, next) => {

    try {

        const { commentId } = req.params

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                mensaje: "Id de comentario inválido"
            })
        }

        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado"
            })
        }

        await comment.populate("user_nickname", "nickname");
        await comment.populate("post_id", "_id");
        
        const commentId = {
            _id: comment._id,
            text: comment.text,
            is_visible: comment.is_visible,
            user_nickname: comment.user_nickname,
            post_id: comment.post_id
        };

        req.comment = commentId

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

export const validatePostAndCommentId = async (req, res, next) => {

    try {

        const { postId, commentId } = req.params

        if (
            !mongoose.Types.ObjectId.isValid(postId) ||
            !mongoose.Types.ObjectId.isValid(commentId)
        ) {
            return res.status(400).json({
                mensaje: "Id inválido"
            })
        }

        const comment = await Comment.findOne({
            _id: commentId,
            post_id: postId
        })

        if (!comment) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado o no pertenece a ese post"
            })
        }

        req.comment = comment

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}