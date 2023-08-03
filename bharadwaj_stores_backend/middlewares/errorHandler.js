

exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    console.log("hello")
    next(error);
}

exports.errorHandler = (error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode == 200 ? 500 : error.statusCode;
    res.status(statusCode).json({
        message: error?.message,
        stack: error?.stack,
        name:error?.name
    });
};

