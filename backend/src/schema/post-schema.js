import Joi from "joi";

export const postSchema = Joi.object( {
    user_nickname: Joi.string().min(3).max(50).required().messages({
        "string.base": "El campo user_nickname es obligatorio y debe ser texto",
        "string.empty": "El campo user_nickname es obligatorio",
        "string.min": "El campo user_nickname debe tener al menos 3 caracteres"
    }),
    text: Joi.string().min(3).max(100).required().messages({
        "string.base": "El campo text es obligatorio y debe ser texto",
        "string.empty": "El campo text es obligatorio",
        "string.min": "El campo text debe tener al menos 3 caracteres"
    }),
    description: Joi.string().required().min(3).max(500).messages({
        "string.base": "El campo description debe ser texto",
        "string.min": "El campo description debe tener al menos 3 caracteres"
    })
})