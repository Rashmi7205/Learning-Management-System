import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'
import userRoutes from "./routes/user.routes.js";
import errorMiddleWare from "./middlewares/error.midddleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import istRoutes from "./routes/instructor.routes.js";
import courseRouter from "./routes/course.routes.js";
import sectionRouter from "./routes/section.routes.js";
import lectureRouter from "./routes/lecture.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app=express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/auth',userRoutes);
app.use('/api/instructors',istRoutes);
app.use('/api/courses',courseRouter);
app.use('/api/courses/:courseId/sections',sectionRouter);
app.use('/api/courses/:courseId/lectures',lectureRouter);
app.use('/api/payments',paymentRouter);
app.use('/api/cart', cartRouter);


app.get('/ping',(req,res)=>{
    res.send('/pong');
});


/// Error page
app.all('*',(req,res)=>{
    return res.status(400).send('OOPS!! PAGE NOT FOUND');
})

app.use(errorMiddleWare);
export default app