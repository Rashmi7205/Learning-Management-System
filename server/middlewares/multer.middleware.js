import multer from "multer";
import path from "path";
import fs from 'fs';
import { randomUUID } from "crypto";
import fs from "fs";

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};


const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fieldDirMap = {
            thumbnail: "uploads/thumbnails",
            promoVideo: "uploads/promo-videos",
            avatar: "uploads/avatars",
            lectureVideo: "uploads/lecture-videos",
            attachments: "uploads/attachments",
            certificate: "uploads/certificates",
        };

        const uploadDir = fieldDirMap[file.fieldname];
        if (!uploadDir) {
            return cb(new Error("Invalid field name"));
        }

        ensureDir(uploadDir);
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const prefixMap = {
            avatar: "avatar",
            thumbnail: "thumbnail",
            promoVideo: "promoVideo",
            lectureVideo: "lectureVideo",
            attachments: "attachment",
            certificate: "certificate",
        };

        const prefix = prefixMap[file.fieldname] || "file";

        cb(null, `${prefix}-${randomUUID()}-${Date.now()}${ext}`);
    },
});

/* File filter */
const fileFilter = (req, file, cb) => {
    const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const videoTypes = ["video/mp4", "video/mkv", "video/webm"];
    const docTypes = [
        "application/pdf",
        "application/zip",
        "application/x-zip-compressed",
    ];

    if (file.fieldname === "thumbnail" || file.fieldname === "avatar") {
        return imageTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Only image files allowed"), false);
    }

    if (file.fieldname === "promoVideo" || file.fieldname === "lectureVideo") {
        return videoTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Only video files allowed"), false);
    }

    if (file.fieldname === "attachments") {
        return docTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Invalid attachment type"), false);
    }

    if (file.fieldname === "certificate") {
        return imageTypes.includes(file.mimetype) || file.mimetype === "application/pdf"
            ? cb(null, true)
            : cb(new Error("Invalid certificate file"), false);
    }

    cb(new Error("Unsupported file field"), false);
};

// Allowed file types and their size limits in bytes
const fileSizeLimits = {
    // images
    'image/jpeg': 5 * 1024 * 1024,    // 5MB
    'image/png': 5 * 1024 * 1024,     // 5MB
    'image/jpg': 5 * 1024 * 1024,     // 5MB
    'image/webp': 5 * 1024 * 1024,    // 5MB
    // videos
    'video/mp4': 50 * 1024 * 1024,    // 50MB
    'video/mkv': 50 * 1024 * 1024,    // 50MB
    'video/webm': 50 * 1024 * 1024,   // 50MB
    // docs
    'application/pdf': 10 * 1024 * 1024,       // 10MB
    'application/zip': 10 * 1024 * 1024,       // 10MB
    'application/x-zip-compressed': 10 * 1024 * 1024, // 10MB
};

/* Multer instance */
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: Math.max(...Object.values(fileSizeLimits)),
    },
});

/* Middleware to check file size by mimetype */
function checkFileSizeByType(req, res, next) {
    if (!req.file) {
        return next();
    }

    const { mimetype, size } = req.file;

    const limit = fileSizeLimits[mimetype];

    if (!limit) {
        return next(new Error('Unsupported file type'));
    }

    if (size > limit) {
        return next(
            new Error(`File size exceeds limit for type ${mimetype}: max allowed is ${limit / (1024 * 1024)}MB`)
        );
    }

    next();
}

export default upload
