import User from "../models/User.js"
import {followSchema} from "../schema/follow-schema.js"

export const validateFollowSchema = (req, res, next) => {

    const { error } = followSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

export const validateExistingUser = async (req, res, next) => {

    try {

        const { userId } = req.params

        const user = await User.findOne({
            nickname: userId
        })

        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario inexistente"
            })
        }

        req.user = user

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

export const validarFollowedUser = async (req, res, next) => {

    try {

        const { followed_user_nickname } = req.body

        const followed = await User.findOne({
            nickname: followed_user_nickname
        })

        if (!followed) {
            return res.status(404).json({
                mensaje: "Usuario a seguir inexistente"
            })
        }

        req.followedUser = followed

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const validateExistingConnection = async (req, res, next) => {

    const follower = req.user
    const followed = req.followedUser

    const exist = follower.seguidos.some(
        id => id.toString() === followed._id.toString()
    )

    if (exist) {
        return res.status(400).json({
            mensaje: "El seguimiento ya existe."
        })
    }

    next()
}

export const validateNonExistingConnection = async (req, res, next) => {

    const follower = req.user
    const followed = req.followedUser

    const exist = follower.seguidos.some(
        id => id.toString() === followed._id.toString()
    )

    if (!exist) {
        return res.status(400).json({
            mensaje: "No existe el seguimiento para eliminar."
        })
    }

    next()
}