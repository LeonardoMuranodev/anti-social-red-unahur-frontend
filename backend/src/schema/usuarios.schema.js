const Joi = require("joi")

const schemaUsuarios = Joi.object({
    nickname: Joi.string().min(3).max(50).required(),

    password: Joi.string().min(3).required().messages({
        "string.empty": "El campo password es obligatorio",
        "string.min": "La contraseña debe tener al menos 6 caracteres"
    })
})

module.exports = schemaUsuarios