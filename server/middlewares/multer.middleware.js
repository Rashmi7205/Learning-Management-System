import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "thumbnail") {
            cb(null, "uploads/thumbnails");
        } else if (file.fieldname === "promoVideo") {
            cb(null, "uploads/promo-videos");
        } else if (file.fieldname === "avatar") {
            cb(null, "uploads/avatars");
        } else {
            cb(new Error("Invalid field name"));
        }
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
    if (file.fieldname === "thumbnail" && file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else if (
        file.fieldname === "promoVideo" &&
        file.mimetype.startsWith("video/")
    ) {
        cb(null, true);
    } else if (file.fieldname === "avatar" && file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};
 const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10,//10 mb max
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
