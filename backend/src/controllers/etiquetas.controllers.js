const Tag = require("../models/Tag")

const obtenerEtiquetas = async (req, res) => {
    /* #swagger.tags = ['Etiquetas']
        #swagger.summary = 'Obtener todas las etiquetas del sistema'
    */

    try {

        const etiquetas = await (await Tag.find({}).select("-createdAt -updatedAt -__v -_id")).map(e => e.name)

        res.status(200).json(etiquetas)

    } catch (error) {
        res.status(500).json({
            error: `Hubo un error a la hora de obtener las etiquetas: ${error.message}`
        })
    }
}

const obtenerEtiqueta = (req, res) => {
    /* #swagger.tags = ['Etiquetas'] */

    try {

        const etiqueta = req.etiqueta

        const etiquetaMapeada = {
            name: etiqueta.name,
        }


        res.status(200).json(etiquetaMapeada)

    } catch (error) {
        res.status(500).json({
            error: `Hubo un error a la hora de obtener una etiqueta por id: ${error.message}`
        })
    }
}

const crearEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Etiquetas'] */

    try {

        const etiqueta = await Tag.create({
            name: req.body.name
        })

        const etiquetaMapeada = {
            name: etiqueta.name,
        }

        res.status(201).json(etiquetaMapeada)

    } catch (error) {
        res.status(500).json({
            error: `Hubo un error a la hora de crear una etiqueta: ${error.message}`
        })
    }
}

const editarEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Etiquetas'] */

    try {

        await Tag.findByIdAndUpdate(
            req.etiqueta._id,
            {
                name: req.body.name
            }
        )

        res.status(200).json({
            mensaje: "Etiqueta actualizada exitosamente"
        })

    } catch (error) {
        res.status(500).json({
            error: `Hubo un error a la hora de editar una etiqueta: ${error.message}`
        })
    }
}

const eliminarEtiqueta = async (req, res) => {
    /* #swagger.tags = ['Etiquetas'] */

    try {

        await Tag.findByIdAndDelete(req.etiqueta._id)

        res.status(200).json({
            mensaje: "Etiqueta eliminada exitosamente"
        })

    } catch (error) {
        res.status(500).json({
            error: `Hubo un error a la hora de eliminar las etiquetas: ${error.message}`
        })
    }
}

module.exports = {
    obtenerEtiquetas,
    obtenerEtiqueta,
    crearEtiqueta,
    editarEtiqueta,
    eliminarEtiqueta
}