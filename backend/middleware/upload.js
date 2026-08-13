import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Set storage engine with crypto-randomized safe filenames
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const randomName = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/gi, '');
        cb(null, `${file.fieldname}-${randomName}${ext}`);
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|webp|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only image files (JPEG, JPG, PNG, WEBP, SVG) are allowed!'));
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

export default upload;

