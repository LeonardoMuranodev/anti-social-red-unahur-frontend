const Comment = require('../models/Comment')
const User = require('../models/User')

const obtenerComentarios = async (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Obtener todos los comentarios del sistema'
        #swagger.responses[200] = {
            description: 'Comentarios retornadas exitosamente.'
        }
    */

    try {
        const comments = await Comment.find({})
        .populate("user_nickname", "nickname")
        .populate("post_id", "id")
        .select("-createdAt -updatedAt -__v");

        const commentsMap = comments.map(c => ({
            ...c.toObject(),
            user_nickname: c.user_nickname.nickname,
            post_id: c.post_id._id
        }));

        res.status(200).json(commentsMap)

        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener los comentarios: ${error.message}` })
    }
}

const obtenerComentario =  (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Obtiene los detalles de un comentario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID del comentario a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Comentario encontrado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Comentario no encontrado.'
        }
    */


    try {
        const comment = req.comment

        res.status(200).json(comment)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener un comentario por id: ${error.message}` })
    }
}

const obtenerComentariosDeUnPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Obtener comentarios visibles de una publicación'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la publicación',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Comentarios retornados exitosamente.'
    }
    #swagger.responses[404] = {
        description: 'Publicación no encontrada.'
    }
    */


    try {
        const { _id } = req.post

        const monthLimits = parseInt(process.env.MESES_LIMITE) || 6; 
        const dayLimit = new Date();
        dayLimit.setMonth(dayLimit.getMonth() - monthLimits);

        const comments = await Comment.find({
            post_id: _id,
            is_visible: true,
            createdAt: { $gte: dayLimit }
        }).populate("user_nickname", "nickname")


        const final_return = comments.map(c => ({
            id: c._id,
            text: c.text,
            nickname: c.user_nickname?.nickname || "Usuario desconocido"
            })
        )

    res.status(200).json(final_return)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de obtener comentarios de un post: ${error.message}` })
    }
}

const crearComentarioEnPost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Crear un nuevo comentario en una publicación específica'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la publicación',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { "$ref": "#/components/schemas/ComentarioNuevo" }
            }
        }
    }
    #swagger.responses[201] = {
        description: 'Comentario creado exitosamente.'
    }
    #swagger.responses[400] = {
        description: 'El cuerpo de la solicitud es inválido.'
    }
    */


    try {
        const user = req.user

        const comment = await Comment.create({
            text: req.body.text,
            is_visible: req.body.is_visible,
            user_nickname: user._id,
            post_id: req.publicacion._id
        })

        const commentMap = {
            text: comment.text,
            is_visible: comment.is_visible,
            user_nickname: user.nickname,
            post_id: comment.post_id
        }

        res.status(201).json(commentMap)

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de crear un comentario: ${error.message}` })
    }
}


const editarComentario = async (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Editar los datos de un comentario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID del comentario a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ComentarioNuevo"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Comentario modificado con exito.'
        }
        #swagger.responses[400] = {
            description: 'El body no cumple con los requisitos.'
        }
        #swagger.responses[404] = {
            description: 'Comentario encontrado en la base de datos.'
        }
    */


    try {
        await Comment.findByIdAndUpdate(
            req.comentario._id,
            {
                text: req.body.text,
                is_visible: req.body.is_visible
            },
            {
                new: true
            }
        )

        res.status(200).json({ mensaje: `Comentario actualizado con exito` })

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de editar el comentario: ${error.message}` })
    }
}

const eliminarComentario = async (req, res) => {
    /* #swagger.tags = ['Comentarios']
        #swagger.summary = 'Elimina un comentario del sistema por su id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID del comentario a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Comentario eliminado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Comentario no encontrado.'
        }
    */
    

    try {
        await Comment.findByIdAndDelete(
            req.comentario._id
        )

        res.status(200).json({
            mensaje: 'Comentario eliminado'
        })

    } catch (error) {
        res.status(500).json({ error: `Hubo un error a la hora de eliminar el comentario: ${error.message}` })
    }
}


module.exports = {
    obtenerComentarios,
    obtenerComentario,
    obtenerComentariosDeUnPost,
    crearComentarioEnPost,
    editarComentario,
    eliminarComentario
}