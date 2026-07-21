const multer = require('multer');
const path = require('path');
const fs = require('fs');

const almacenamientoDeImagenes = multer.diskStorage({
    destination: function (req, file, cb) {

        const dir = 'uploads/';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, nombreUnico + path.extname(file.originalname));
    }
});

const filtrosImagenes = (req, file, cb) => {
    const archivosPermitidos = ['image/jpeg', 'image/png', 'image/webp']

    if (archivosPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('El archivo no es una imagen válida'), false);
    }
};

const upload = multer({ 
    storage: almacenamientoDeImagenes,
    fileFilter: filtrosImagenes,
    limits: { fileSize: 5 * 1024 * 1024 }
});


const validarArchivoExistente = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ mensaje: "No se proporcionó ninguna imagen" });
    }
    next();
};


module.exports = {
    upload,
    validarArchivoExistente
}