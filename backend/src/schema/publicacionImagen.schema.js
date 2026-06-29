const Joi = require("joi")

const schemaImagen = Joi.object( {
    url: Joi.string().min(3).max(200).required().messages({
        "string.base": "El campo url es obligatorio y debe ser texto",
        "string.empty": "El campo url es obligatorio",
        "string.min": "El campo url debe tener al menos 3 caracteres"
    })
})

module.exports = schemaImagen