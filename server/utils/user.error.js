import fs from "fs";
const cleanupFiles = (files = {}) => {
    if (!files) return;
    Object.values(files).forEach(fileArray => {
        if (Array.isArray(fileArray)) {
            fileArray.forEach(file => {
                try {
                    if (file?.path && fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                } catch (err) {
                    console.error("File cleanup failed:", err.message);
                }
            });
        }
    });
};
const ApiError = (
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

export default ApiError;
