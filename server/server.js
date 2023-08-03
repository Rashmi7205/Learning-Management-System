import app from './app.js'
import connectToDb from './config/dbconnection.js';
import cloudinary, { v2 } from 'cloudinary';

import { config } from 'dotenv';
config();


v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const PORT=process.env.PORT||5010;

app.listen(PORT,async()=>{
    await connectToDb();
    console.log('Server is Running at',PORT);
})