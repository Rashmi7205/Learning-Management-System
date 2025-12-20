import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

/* ================= CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/* ================= IMAGE UPLOAD ================= */
const uploadImage = async (filePath) => {
  if (!filePath) throw new Error("File path missing");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: "lms",
    });

    fs.rmSync(filePath);

    return {
      publicId: res.public_id,
      secureUrl: res.secure_url,
    };
  } catch (error) {

    throw new Error(error.message);
  }
};

/* ================= VIDEO UPLOAD ================= */
const uploadVideo = async (filePath) => {
  if (!filePath) throw new Error("File path missing");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "lms",
    });

    fs.unlinkSync(filePath); // ✅ cleanup

    return {
      publicId: res.public_id,
      secureUrl: res.secure_url,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ================= DELETE IMAGE ================= */
const deleteImage = async (publicId) => {
  if (!publicId) return false;

  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ================= DELETE VIDEO ================= */
const deleteVideo = async (publicId) => {
  if (!publicId) return false;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  uploadImage,
  uploadVideo,
  deleteImage,
  deleteVideo,
};
