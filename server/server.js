import app from './app.js'
import connectToDb from './config/dbconnection.js';

import { config } from 'dotenv';
config();

const PORT=process.env.PORT||5010;

app.listen(PORT,async()=>{
    await connectToDb();
    console.log('Server is Running at',PORT);
})