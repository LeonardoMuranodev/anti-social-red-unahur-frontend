const User = require('../models/User')

const obtenerUsuarios = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtener todos los usuarios del sistema'
        #swagger.responses[200] = {
            description: 'Usuarios retornados exitosamente.'
        }
    */


    try {
        const users = await User.find({}).select("-createdAt -updatedAt -__v -_id -password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener los usuarios: ${error.message}` })
    }
}

const obtenerUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtiene los detalles de un usuario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID cadena de texto del usuario a buscar',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Usuario encontrado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado.'
        }
    */


    try {
        const user =  req.usuario

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener el usuario: ${error.message}` })
    }
}


const crearUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Crea un nuevo usuario en el sistema'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UsuarioNuevo"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Usuario creado exitosamente.'
        }
        #swagger.responses[400] = {
            description: 'El nickname es obligatorio o está vacío.'
        }
    */


    try {
        const user = await User.create({
            nickname: req.body.nickname,
            password: req.body.password
        })

        const userMap = {
            nickname: user.nickname,
            seguidores: user.seguidores,
            seguidos: user.seguidos
        }

        res.status(201).json(userMap)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear el usuario: ${error.message}` })
    }
}

const loginUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
    #swagger.summary = 'Loguea un usuario en el sistema'
    
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        nickname: { type: "string" },
                        password: { type: "string" }
                    },
                    required: ["nickname", "password"]
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: 'Login exitoso. Retorna datos del usuario.',
        schema: {
            id: "string",
            nickname: "string",
            seguidores: ["array de ids"],
            seguidos: ["array de ids"]
        }
    }

    #swagger.responses[401] = {
        description: 'Contraseña incorrecta.'
    }

    #swagger.responses[404] = {
        description: 'El usuario no existe.'
    }
    */


    try {
        const user = req.usuario

        const userMap = {
            id: user._id,
            nickname: user.nickname,
            seguidores: user.seguidores,
            seguidos: user.seguidos
        }

        res.status(200).json(userMap)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear el usuario: ${error.message}` })
    }
}

const editarUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Editar los datos de un usuario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID cadena de texto del usuario a buscar',
            required: true,
            type: 'string'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UsuarioNuevo"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Usuario modificado con exito.'
        }
        #swagger.responses[400] = {
            description: 'El nickname es obligatorio o está vacío.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado en la base de datos.'
        }
    */


    try {

        await User.findByIdAndUpdate(
            req.usuario._id,
            {
            nickname: req.body.nickname,
            password: req.body.password
            }
        )

        res.status(200).json("Usuario actualizado con exito")
    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de editar el usuario: ${error.message}` })
    }
}

const eliminarUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Elimina un usuario del sistema por su id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID cadena de texto del usuario a eliminar',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Usuario eliminado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado.'
        }
    */


    try {
        const {nickname} = req.usuario

        await User.findOneAndDelete({
            nickname: nickname
        })
        res.status(200).json({
            mensaje: 'Usuario eliminado exitosamente'
        })

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de eliminar el usario: ${error.message}` })
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    loginUsuario,
    editarUsuario,
    eliminarUsuario
}