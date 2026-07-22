import {mongoose } from "mongoose"
import Post from "../models/Post.js"
import {postSchema} from "../schema/post-schema.js"

export const validatePost = (req, res, next) => {

    const { error } = postSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

export const validatePostId = async (req, res, next) => {

    try {

        const { postId } = req.params

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        const post = await Post.findById(postId)

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