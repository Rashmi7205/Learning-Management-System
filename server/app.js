import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'
import userRoutes from "./routes/user.routes.js";
import errorMiddleWare from "./middlewares/error.midddleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import istRoutes from "./routes/instructor.routes.js";

const app=express();

app.use(express.json());
// app.use(cors({
//     origin:[process.env.FRONTEND_URL],
//     credentials:true
// }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.urlencoded({extended:true}));
app.use(cookieParser());/// parse token to json
app.use('/api/auth',userRoutes);
app.use('/api/instructors',istRoutes);

app.get('/ping',(req,res)=>{
    res.send('/pong');
});


/// Error page
app.all('*',(req,res)=>{
    return res.status(400).send('OOPS!! PAGE NOT FOUND');
})

app.use(errorMiddleWare);
export default app