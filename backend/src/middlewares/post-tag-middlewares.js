import {mongoose} from "mongoose"
import Tag from "../models/Tag.js"
import Post from "../models/Post.js"

export const validatePostAndTagId = async (req, res, next) => {

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

        const tag = await Tag.findById(tagId)

        if (!tag) {
            return res.status(404).json({
                mensaje: "Etiqueta no encontrada"
            })
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        req.tag = tag
        req.post = post

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}