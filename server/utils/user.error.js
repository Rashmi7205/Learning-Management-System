const AppError = (
    res,
    message = "Internal Server Error",
    statusCode = 500,
    errors = null,
) => {

    if (process.env.NODE_ENV === "dev") {
        console.error("API ERROR:", message);

        if (errors) {
            console.error("DETAILS:", errors);
        }
    }

    const response = {
        success: false,
        message,
    };

    if (errors) response.errors = errors;

    return res.status(statusCode).json(response);
};

export default AppError;
