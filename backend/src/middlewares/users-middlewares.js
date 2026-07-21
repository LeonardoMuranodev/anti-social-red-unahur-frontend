const User = require("../models/User")
const schemaUsuarios = require("../schema/usuarios-schema")

const validarUsuarioSchema = (req, res, next) => {
    const { error } = schemaUsuarios.validate(req.body)

    if (error) {
        return res.status(400).json({
            mensaje: `El body no cumple con los parametros solicitados: ${error.details[0].message}`
        })
    }

    next()
}

const validarUsuarioId = async (req, res, next) => {
    try {
        const { userId } = req.params


        const usuario = await User.findOne({ nickname: userId })
            .populate('seguidores', 'nickname')
            .populate('seguidos', 'nickname')
            .select("-password");

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }

        req.usuario = usuario

        next()

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const validarUsuarioExistenteEnBody = async (req, res, next) => {
    try {
        const { user_nickname } = req.body
        const { nickname } = req.body

        const name =  user_nickname ? user_nickname : nickname
        console.log(nombre)

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

const validarContraseniaDeUsuario = async (req, res, next) => {
    try {
        const user = req.usuario

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

module.exports = {
    validarUsuarioId,
    validarUsuarioSchema,
    validarUsuarioExistenteEnBody,
    validarContraseniaDeUsuario
}