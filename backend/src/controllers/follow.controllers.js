const User = require("../models/User")

const obtenerFollows = async (req, res) => {
    /* #swagger.tags = ['Follows']
        swagger.summary = 'Obtener la lista global de usuarios con sus seguidos'
        #swagger.responses[200] = {
            description: 'Lista de follows obtenida correctamente.'
        }
    */

    try {

        const usuarios = await User.find({})
            .populate("seguidos", "nickname")
            .select("nickname seguidos")

        res.status(200).json(usuarios)

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error al obtener los follows: ${error.message}`
        })

    }

}

const obtenerFollowsDeUser = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Obtener los usuarios que sigue un usuario específico'
        #swagger.parameters['user'] = {
            in: 'path',
            description: 'Nickname del usuario',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Follows obtenidos correctamente.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado.'
        }
    */

    try {

        await req.user.populate("seguidos", "nickname")

        res.status(200).json(req.user.seguidos)

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error al obtener los follows: ${error.message}`
        })

    }

}

const crearFollow = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Seguir a un usuario'
        #swagger.parameters['user'] = {
            in: 'path',
            description: 'Nickname del usuario que va a seguir a otro',
            required: true,
            type: 'string'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/FollowNuevo"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Seguimiento creado correctamente.'
        }
        #swagger.responses[400] = {
            description: 'El body no es válido o el seguimiento ya existe.'
        }
        #swagger.responses[404] = {
            description: 'Usuario o seguido no encontrado.'
        }
    */

    try {

        const seguidor = req.user
        const seguido = req.followedUser

        await User.findByIdAndUpdate(
            seguidor._id,
            {
                $addToSet: {
                    seguidos: seguido._id
                }
            }
        )

        await User.findByIdAndUpdate(
            seguido._id,
            {
                $addToSet: {
                    seguidores: seguidor._id
                }
            }
        )

        res.status(201).json({
            mensaje: "Seguimiento creado correctamente"
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error al registrar el follow: ${error.message}`
        })

    }

}

const eliminarFollow = async (req, res) => {
    /* #swagger.tags = ['Follows']
        #swagger.summary = 'Dejar de seguir a un usuario'
        #swagger.parameters['user'] = {
            in: 'path',
            description: 'Nickname del usuario que va a dejar de seguir a otro',
            required: true,
            type: 'string'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/FollowNuevo"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Seguimiento eliminado correctamente.'
        }
        #swagger.responses[400] = {
            description: 'No existe el seguimiento para eliminar.'
        }
        #swagger.responses[404] = {
            description: 'Usuario o seguido no encontrado.'
        }
    */


    try {

        const seguidor = req.user
        const seguido = req.followedUser

        await User.findByIdAndUpdate(
            seguidor._id,
            {
                $pull: {
                    seguidos: seguido._id
                }
            }
        )

        await User.findByIdAndUpdate(
            seguido._id,
            {
                $pull: {
                    seguidores: seguidor._id
                }
            }
        )

        res.status(200).json({
            mensaje: "Seguimiento eliminado"
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error al eliminar el follow: ${error.message}`
        })

    }

}

module.exports = {
    crearFollow,
    obtenerFollows,
    eliminarFollow,
    obtenerFollowsDeUser
}