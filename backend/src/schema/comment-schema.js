import Joi from "joi";

export const commentSchema = Joi.object( {
    text: Joi.string().min(3).max(50).required().messages({
        "string.base": "El campo text es obligatorio y debe ser texto",
        "string.empty": "El campo text es obligatorio",
        "string.min": "El campo text debe tener al menos 3 caracteres"
    }),
    is_visible: Joi.boolean().required().messages({
        "boolean.base": "El campo is_visible debe ser booleano",
        "boolean.empty": "El campo is_visible es obligatorio"
    }),
    user_nickname: Joi.string().min(3).max(50).required().messages({
        "string.base": "El campo user_nickname debe ser texto",
        "string.empty": "El campo user_nickname es obligatorio",
        "string.min": "El campo user_nickname debe tener al menos 3 caracteres"
    }),
})