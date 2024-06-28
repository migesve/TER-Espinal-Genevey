const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const typeSchema = req.body.typeSchema;
        const uploadPath = typeSchema === '1' ? path.join(__dirname, '../frontend/src/images/schema3') : path.join(__dirname, '../frontend/src/images/schema4');

        // Vérifiez si le répertoire existe, sinon créez-le
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const image_name = `P${req.body.position}I${req.body.inclinaison}A${req.body.angle}.png`;
        cb(null, image_name);
    }
});

const upload = multer({ storage: storage });

// Route avec multer
router.post('/', upload.single('image'), (req, res) => {
    try {
        console.log('Received form data:', req.body);
        console.log('Received file data:', req.file);
        res.json({ success: true, message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error in response handler:', error);
        res.status(500).json({ success: false, message: 'Image upload failed', error: error.message });
    }
});

module.exports = router;
