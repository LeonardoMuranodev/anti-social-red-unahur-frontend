import User from "../models/User.js"
import {userSchema} from "../schema/usuarios-schema.js"

export const validateUserSchema = (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            mensaje: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

export const validateUserId = async (req, res, next) => {
    try {
        const { userId } = req.params


        const user = await User.findOne({ nickname: userId })
            .populate('seguidores', 'nickname')
            .populate('seguidos', 'nickname')
            .select("-password");

        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const validateUserExistsInBody = async (req, res, next) => {
    try {
        const { user_nickname } = req.body
        const { nickname } = req.body

        const name =  user_nickname ? user_nickname : nickname
        console.log(name)

        const user = await User.findOne({
            nickname: name
        }).populate('seguidores', 'nickname')
            .populate('seguidos', 'nickname')

        if (!user) {
            return res.status(404).json({
                mensaje: " El usuario no existe en la base de datos"
            })
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const validateUserPassword = async (req, res, next) => {
    try {
        const user = req.user

        console.log(user.password, "<>", req.body.password)
        if (!user) {
            return res.status(404).json({
                mensaje: "el usuario no existe en la base de datos"
            })
        }

        if (user.password !== req.body.password) {
            return res.status(403).json({
                mensaje: "La contraseña es incorrecta"
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}