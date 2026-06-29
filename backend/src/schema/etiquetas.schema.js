const Joi = require("joi")

const schemaEtiquetas = Joi.object( {
    name: Joi.string().min(3).max(50).required().messages({
        "string.base": "El campo name es obligatorio y debe ser texto",
        "string.empty": "El campo name es obligatorio",
        "string.min": "El campo name debe tener al menos 3 caracteres"
    })
})

module.exports = schemaEtiquetas