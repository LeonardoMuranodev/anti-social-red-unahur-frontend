const User = require("../models/User")
const schemaUsuarios = require("../schema/usuarios.schema")

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
        const { id } = req.params
        const { userId } = req.params

        const idValido = id | userId

        const usuario = await User.findOne({
            nickname: idValido
        }).select("nickname")

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

        const nombre =  user_nickname ? user_nickname : nickname
        console.log(nombre)

        const usuario = await User.findOne({
            nickname: nombre
        })

        if (!usuario) {
            return res.status(404).json({
                mensaje: " El usuario no existe en la base de datos"
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

const validarContraseniaDeUsuario = async (req, res, next) => {
    try {
        const usuario = req.usuario

        console.log(usuario.password, "<>", req.body.password)
        if (!usuario) {
            return res.status(404).json({
                mensaje: "el usuario no existe en la base de datos"
            })
        }

        if (usuario.password !== req.body.password) {
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