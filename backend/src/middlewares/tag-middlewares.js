import {mongoose} from "mongoose"
import Tag from "../models/Tag.js"
import {tagSchema} from "../schema/tag-schema.js"

export const validateTagSchema = (req, res, next) => {

    const { error } = tagSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

export const validateTagId = async (req, res, next) => {

    try {

        const { tagId } = req.params

        if (!mongoose.Types.ObjectId.isValid(tagId)) {
            return res.status(400).json({
                mensaje: "Id de etiqueta inválido"
            })
        }

        const tag = await Tag.findById(tagId)

        if (!tag) {
            return res.status(404).json({
                mensaje: "Etiqueta no encontrada"
            })
        }

        req.tag = tag

        next()

    } catch (error) {

        return res.status(500).json({
            error: `Hubo un error al validar la etiqueta: ${error.message}`
        })

    }

}