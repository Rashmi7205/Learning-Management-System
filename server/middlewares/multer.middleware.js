import multer from "multer";
import path from "path";
import fs from 'fs';
import { randomUUID } from "crypto";


const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let relativePath = "";
        if (file.fieldname === "thumbnail") {
            relativePath = "uploads/thumbnails";
        } else if (file.fieldname === "promoVideo") {
            relativePath = "uploads/promo-videos";
        } else if (file.fieldname === "avatar") {
            relativePath = "uploads/avatars";
        } else if (file.fieldname === "lectureVideo") {
            relativePath = "uploads/videos";
        } else if (file.fieldname === "attachment") {
            relativePath = "uploads/attachments";
        } else {
            return cb(new Error("Invalid field name"));
        }

        ensureDirExists(relativePath);

        cb(null, relativePath);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const fileNameMap = {
            avatar: "avatar",
            thumbnail: "thumbnail",
            promoVideo: "promoVideo",
        };

        const prefix = fileNameMap[file.fieldname] || "file";

        cb(null, `${prefix}-${randomUUID()}-${Date.now()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = {
        thumbnail: ["image/jpeg", "image/png", "image/webp"],
        avatar: ["image/jpeg", "image/png", "image/webp"],
        promoVideo: ["video/mp4"],
        lectureVideo: ["video/mp4"],
        attachment: ["application/pdf"]
    };

    if (allowed[file.fieldname]?.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};
 const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 20,//10 mb max
    },
});
export default upload;

// req.files = {
//     thumbnail: [
//         {
//             fieldname: "thumbnail",
//             originalname: "thumb.png",
//             filename: "thumbnail-uuid-123.png",
//             path: "uploads/thumbnails/thumbnail-uuid-123.png",
//             mimetype: "image/png",
//         }
//     ],
//     promoVideo: [
//         {
//             fieldname: "promoVideo",
//             originalname: "intro.mp4",
//             filename: "promoVideo-uuid-456.mp4",
//             path: "uploads/promo-videos/promoVideo-uuid-456.mp4",
//             mimetype: "video/mp4",
//         }
//     ]
// };
