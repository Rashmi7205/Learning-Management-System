const AppError = (
    res,
    message = "Internal Server Error",
    statusCode = 500,
    files = null
) => {
    cleanupFiles(files);
    if (process.env.NODE_ENV === "dev") {
        console.error("API ERROR:", message);
    }
    const response = {
        success: false,
        message,
    };
    return res.status(statusCode).json(response);
};

export default AppError;
