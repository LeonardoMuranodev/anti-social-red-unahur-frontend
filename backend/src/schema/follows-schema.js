const Joi = require("joi")

const schemaFollows = Joi.object( {
    followed_user_nickname: Joi.string().disallow(Joi.ref('following_user_nickname')).min(3).max(50).required().messages({
        "string.base": "El campo followed_user_nickname es obligatorio y debe ser texto",
        "string.empty": "El campo followed_user_nickname es obligatorio",
        "string.min": "El campo followed_user_nickname debe tener al menos 3 caracteres",
        "string.disallow": "El campo followed_user_nickname no debe ser igual al campo following_user_nickname"
    })
})

module.exports = schemaFollows