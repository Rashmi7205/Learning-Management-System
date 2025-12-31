import fs from "fs";
import dotenv from "dotenv";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import path from "path";
import crypto from "crypto";
import mime from "mime-types";

dotenv.config();

//s3 config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET = process.env.AWS_S3_BUCKET;

/* ================= KEY GENERATOR ================= */
const generateKey = (folder, filePath) => {
  const ext = path.extname(filePath);
  return `${folder}/${crypto.randomUUID()}${ext}`;
};

//IMAGE UPLOAD
const uploadImage = async (filePath) => {
  if (!filePath) throw new Error("File path missing");
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");

  const key = generateKey("images", filePath);
  const contentType = mime.lookup(filePath);

  if (!contentType) throw new Error("Invalid image type");

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: fs.createReadStream(filePath),
        ContentType: contentType
      })
    );

    fs.rmSync(filePath);

    return {
      publicId: key,
      secureUrl: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    };
  } catch (error) {
    fs.rmSync(filePath);
    throw new Error(error.message);
  }
};

//VIDEO UPLOAD
const uploadVideo = async (filePath) => {
  if (!filePath) throw new Error("File path missing");
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");

  const key = generateKey("videos", filePath);
  const contentType = mime.lookup(filePath);

  if (!contentType) throw new Error("Invalid video type");

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: fs.createReadStream(filePath),
        ContentType: contentType
      })
    );

    fs.rmSync(filePath);

    return {
      publicId: key,
      secureUrl: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    };
  } catch (error) {
    fs.rmSync(filePath);
    throw new Error(error.message);
  }
};

//Delete Image
const deleteImage = async (publicId) => {
  if (!publicId) return false;

  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: publicId
    })
  );

  return true;
};

const deleteVideo = deleteImage;

export {
  uploadImage,
  uploadVideo,
  deleteImage,
  deleteVideo
};
