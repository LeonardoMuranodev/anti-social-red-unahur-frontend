const Post = require("../models/Post")

const agregarEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Agregar etiqueta por id a una publicacion por su ID'
    */

    try {

        const post = req.post
        const tag = req.tag

        const existe = post.etiquetas.some(
            id => id.toString() === tag._id.toString()
        )

        if (existe) {
            return res.status(400).json({
                mensaje: "La etiqueta ya está asociada a la publicación"
            })
        }

        post.etiquetas.push(tag._id)

        await post.save()

        res.status(201).json({
            mensaje: "Etiqueta asociada exitosamente"
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error a la hora de agregar una etiqueta al post: ${error.message}`
        })

    }
}

const obtenerEtiquetasDePost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Obtener etiquetas de una publicacion por su ID'
    */

    try {

        const post = await Post.findById(req.post._id)
        .populate("etiquetas", "name")

        const tags = post.etiquetas.map(tag => tag.name)

        res.status(200).json({
            etiquetas: tags
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error a la hora de obtener etiquetas de un post: ${error.message}`
        })

    }
}

const eliminarEtiquetaDePost = async (req, res) => {
    /* #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Eliminar etiqueta por id de una publicacion por su ID'
    */

    try {

        const post = req.post
        const tag = req.tag

        const exist = post.etiquetas.some(
            id => id.toString() === tag._id.toString()
        )

        if (!exist) {
            return res.status(404).json({
                mensaje: "La etiqueta no está asociada a la publicación"
            })
        }

        await post.etiquetas.pull(tag._id)
        await post.save()

        res.status(200).json({
            mensaje: "Etiqueta eliminada exitosamente"
        })

    } catch (error) {

        res.status(500).json({
            error: `Hubo un error a la hora de eliminar una etiqueta al post: ${error.message}`
        })

    }
}

module.exports = {
    agregarEtiqueta,
    obtenerEtiquetasDePost,
    eliminarEtiquetaDePost
}