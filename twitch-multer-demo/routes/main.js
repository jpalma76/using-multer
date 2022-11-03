import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import multer from 'multer';

// Router
const router = express.Router();

// Controller
import { controller } from '../controllers/main.js';

// Storage de Multer
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = path.resolve(__dirname, "../public/uploads");
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const filename = req
            .body
            .nickname
            .replaceAll(" ", "-")
            .toLowerCase()
        const fileExtension = path.extname(file.originalname)
        cb(null, `${filename}-${Date.now()}${fileExtension}`);
    }
});

// Uploads function
const fileUpload = multer({ 
    storage : diskStorage,
    fileFilter: (req, file, cb) => { // filefiltes es una funcion que toma req, file y un callback
        const acceptedExtensions = [".jpg", ".png"];
        const fileExtension = path.extname(file.originalname);
        const isAnAcceptedExtension = acceptedExtensions.includes(fileExtension);
            // Validacxion de si es o no una extencion aceptada
            if(isAnAcceptedExtension) {
                cb(null, true);
            } else {
                cb(null, false);
            }
    }
});

// Routes of controller
router.get("/", controller.index);
router.post("/guardar", fileUpload.single("avatar"), controller.storeAvatar);
router.post("/guardarComoApi", fileUpload.single("avatar"), controller.storeAvatarComoApi);

export default router;