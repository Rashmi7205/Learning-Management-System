import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

const cloudinary = v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath)=>{
  try {
    if (!filePath) {
      throw new Error("filepath missing");
    }
    if (fs.existsSync(filePath)) {
      const res = await cloudinary.uploader.upload(filePath)
      if (!res) {
        throw new Error("Image upload Failed");
      }
      return {
        publicId: res?.public_id,
        secureUrl: res?.secure_url
      }
    } else {
      throw new Error("File does'nt exist");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
const uploadVideo = async (filePath)=>{
    try {
      if(!filePath){
        throw new Error("filepath missing");
      }
      if(fs.existsSync(filePath)){
        const res = await cloudinary.uploader.upload(filePath)
        if (!res) {
          throw new Error("Image upload Failed");
        }
        return {
          publicId: res?.public_id,
          secureUrl: res?.secure_url
        }
      }else{
        throw new Error("File does'nt exist");
      }
    } catch (error) {
        throw new Error(error.message);
    }
}
const deleteImage = async (public_id)=>{
  try {
    if(!public_id){
      return false;
    }
    await cloudinary.uploader.destroy();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}
const deleteVideo = async () => {
  try {
    if (!public_id) {
      return false;
    }
    await cloudinary.uploader.destroy();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}


export {
  uploadImage,
  uploadVideo,
  deleteImage,
  deleteVideo
}