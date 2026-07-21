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
        const posts = await Post.find({})
        .populate("user_nickname", "nickname")
        .populate("etiquetas", "name")
        .populate("imagenes", "url")
        .select("-createdAt -updatedAt -__v")

        const postsMap = posts.map(p => ({
            ...p.toObject(),
            user_nickname: p.user_nickname ? p.user_nickname.nickname : "Usuario desconocido",
            imagenes: p.imagenes.map(e => e.url),
            etiquetas: p.etiquetas.map(e => e.name)
        }));

        res.status(200).json(postsMap)

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
        const post = await Post.findById(req.post)
        .populate("user_nickname", "nickname")
        .populate("etiquetas", "name")
        .populate("imagenes", "url")
        .select("-createdAt -updatedAt -__v");

        
        const postMap = {
            ...post.toObject(),
            user_nickname: post.user_nickname.nickname,
            imagenes: post.imagenes.map(e => e.url),
            etiquetas: post.etiquetas.map(e => e.name)
        };

        res.status(200).json(postMap)

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
        const user = req.user

        const post = await Post.create({
            user_nickname: user._id,
            text: req.body.text,
            description: req.body.description
        })

        const postMap = {
            id: post._id,
            user_nickname: user.nickname,
            text: post.text,
            description: post.description,
            imagenes: post.imagenes,
            etiquetas: post.etiquetas
        }

        res.status(201).json(postMap)

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
        const { _id } = req.post

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
        const { _id } = req.post

        await Post.findByIdAndDelete(_id)

        res.status(200).json("Publicacion eliminada")

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la eliminar la publicacion: ${error.message}` })
    }
}

const obtenerFeed = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Obtiene las publicaciones de los seguidos del usuario'
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
        const user = await User.findOne({ nickname: req.user.nickname });

        const followed = user ? user.seguidos : []

        const post = await Post.find({user_nickname: { $in: followed}})
        .populate("user_nickname", "nickname")
        .populate("etiquetas", "name")
        .populate("imagenes", "url")
        .sort({ createdAt: -1 })
        .select("-createdAt -updatedAt -__v")

        const postsMap = post.map(p => ({
            ...p.toObject(),
            user_nickname: p.user_nickname ? p.user_nickname.nickname : "Usuario desconocido",
            imagenes: p.imagenes.map(e => e.url),
            etiquetas: p.etiquetas.map(e => e.name)
        }));

        res.status(200).json(postsMap)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener el feed del usuario: ${error.message}` })
    }
}

const obtenerPublicacionesDelUsuario = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
        #swagger.summary = 'Obtiene las publicaciones de un usuario por su ID'
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
        const userId = req.user._id; 


        const post = await Post.find({ user_nickname: userId })
        .populate("user_nickname", "nickname")
        .populate("etiquetas", "name")
        .populate("imagenes", "url")
        .sort({ createdAt: -1 })
        .select("-createdAt -updatedAt -__v");


        const postMap = post.map(p => ({
            ...p.toObject(),
            user_nickname: p.user_nickname.nickname,
            imagenes: p.imagenes.map(e => e.url),
            etiquetas: p.etiquetas.map(e => e.name)
        }));

        res.status(200).json(postMap);

    } catch (error) {
        res.status(500).json({ error: `Error al obtener tus publicaciones: ${error.message}` });
    }
}

module.exports = {
    obtenerPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion,
    obtenerFeed,
    obtenerPublicacionesDelUsuario
}