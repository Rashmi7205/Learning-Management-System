const errorMiddleWare = (err,req,res)=>{

    err.statusCode = err.statusCode||500;
    err.message = err.message || "Something Went Wrong!";

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack
    })
}

export default errorMiddleWare;