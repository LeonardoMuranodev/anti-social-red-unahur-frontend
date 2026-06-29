const Post = require('../models/Post')
const User = require('../models/User')

const obtenerPublicaciones = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Obtener todos las publicaciones del sistema'
        #swagger.responses[200] = {
            description: 'Publicaciones retornados exitosamente.'
        }
    */

    try {
        const publicaciones = await Post.find({})
        .populate("user_nickname", "nickname")
        .populate("etiquetas", "name")
        .populate("imagenes", "url")
        .select("-createdAt -updatedAt -__v")

        const publicacionesMapeadas = publicaciones.map(p => ({
            ...p.toObject(),
            user_nickname: p.user_nickname.nickname,
            imagenes: p.imagenes.map(e => e.url),
            etiquetas: p.etiquetas.map(e => e.name)
        }));

        res.status(200).json(publicacionesMapeadas)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener las publicaciones: ${error.message}` })
    }
}

const obtenerPublicacion = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Obtiene los detalles de una publicacion por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID de la publicacion a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Publicacion encontrada exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Publicacion no encontrada.'
        }
    */


    try {
        const publicacion = await Post.findById(req.publicacion)
        .populate("user_nickname", "nickname")
        .populate("etiquetas", "name")
        .populate("imagenes", "url")
        .select("-createdAt -updatedAt -__v");

        
        const publicacionMapeada = {
            ...publicacion.toObject(),
            user_nickname: publicacion.user_nickname.nickname,
            imagenes: publicacion.imagenes.map(e => e.url),
            etiquetas: publicacion.etiquetas.map(e => e.name)
        };

        res.status(200).json(publicacionMapeada)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener la publicacion por ID: ${error.message}` })
    }
}

const crearPublicacion = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Crea un nuevo usuario en el sistema'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/PublicacionNueva"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Publiicacion creada exitosamente.'
        }
        #swagger.responses[400] = {
            description: 'El body no esta completo.'
        }
        #swagger.responses[404] = {
            description: 'No se puede crear la publicación: el usuario no existe en la base de datos'
        }
    */


    try {
        const user = req.usuario

        const publicacion = await Post.create({
            user_nickname: user._id,
            text: req.body.text,
            description: req.body.description
        })

        const publicacionMapeada = {
            id: publicacion._id,
            user_nickname: user.nickname,
            text: publicacion.text,
            description: publicacion.description,
            imagenes: publicacion.imagenes,
            etiquetas: publicacion.etiquetas
        }

        res.status(201).json(publicacionMapeada)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear una publicacion: ${error.message}` })
    }
}

const editarPublicacion = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Editar los datos de una publicacion por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID de la publicacion a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/PublicacionNueva"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Publicacion modificada con exito.'
        }
        #swagger.responses[400] = {
            description: 'El body no esta completo'
        }
        #swagger.responses[404] = {
            description: 'Publicacion no encontrada en la base de datos.'
        }
    */


    try {
        const { _id } = req.publicacion

        await Post.findByIdAndUpdate(_id,
            {
                text: req.body.text,
                description: req.body.description
            }
        )

        res.status(200).json("Publicacion actualizada con exito")

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de editar la publicacion: ${error.message}` })
    }
}

const eliminarPublicacion = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Elimina una publicacion del sistema por su id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID de la publicacion a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Publicacion eliminada exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Publicacion no encontrada.'
        }
    */


    try {
        const { _id } = req.publicacion

        await Post.findByIdAndDelete(_id)

        res.status(200).json("Publicacion eliminada")

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la eliminar la publicacion: ${error.message}` })
    }
}

module.exports = {
    obtenerPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
}