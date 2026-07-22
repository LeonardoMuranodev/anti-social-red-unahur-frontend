import {mongoose} from "mongoose"
import Post from "../models/Post.js"
import {imageSchema} from "../schema/post-image-schema.js"

export const validateImage = (req, res, next) => {

    const { error } = imageSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

export const validatePostAndImageId = async (req, res, next) => {

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

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                mensaje: "Publicación no encontrada"
            })
        }

        const image = post.imagenes.find(
            img => img._id.toString() === imageId
        )

        if (!image) {
            return res.status(404).json({
                mensaje: "Imagen no encontrada o no pertenece a esta publicación"
            })
        }

        req.post = post
        req.image = image

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}