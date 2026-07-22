import multer from 'node:multer';
import path from 'node:path'
import fs from 'node:fs';

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        const dir = 'uploads/';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const imageFilters = (req, file, cb) => {
    const filesAllowed = ['image/jpeg', 'image/png', 'image/webp']

    if (filesAllowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('El archivo no es una imagen válida'), false);
    }
};

export const upload = multer({ 
    storage: imageStorage,
    fileFilter: imageFilters,
    limits: { fileSize: 5 * 1024 * 1024 }
});


export const validateExistingFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ mensaje: "No se proporcionó ninguna imagen" });
    }
    next();
};