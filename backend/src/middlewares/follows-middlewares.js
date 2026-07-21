const User = require("../models/User")
const schemaFollows = require("../schema/follows.schema")

const validarEsquemaFollow = (req, res, next) => {

    const { error } = schemaFollows.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

const validarUsuarioExistente = async (req, res, next) => {

    try {

        const { userId } = req.params

        const usuario = await User.findOne({
            nickname: user
        })

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario inexistente"
            })
        }

        req.user = usuario

        next()

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

}

const validarFollowedUser = async (req, res, next) => {

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

const validarConexionExistente = async (req, res, next) => {

    const seguidor = req.user
    const seguido = req.followedUser

    const existe = seguidor.seguidos.some(
        id => id.toString() === seguido._id.toString()
    )

    if (existe) {
        return res.status(400).json({
            mensaje: "El seguimiento ya existe."
        })
    }

    next()
}

const validarConexionInexistente = async (req, res, next) => {

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

module.exports = {
    validarEsquemaFollow,
    validarUsuarioExistente,
    validarFollowedUser,
    validarConexionExistente,
    validarConexionInexistente
}