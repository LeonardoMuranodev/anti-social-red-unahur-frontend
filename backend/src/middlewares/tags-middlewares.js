const mongoose = require("mongoose")
const Tag = require("../models/Tag")
const schemaEtiquetas = require("../schema/etiquetas.schema")

const validarEtiquetaSchema = (req, res, next) => {

    const { error } = schemaEtiquetas.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

const validarEtiquetaId = async (req, res, next) => {

    try {

        const { tagId } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: "Id de etiqueta inválido"
            })
        }

        const tag = await Tag.findById(id)

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

module.exports = {
    validarEtiquetaSchema,
    validarEtiquetaId
}