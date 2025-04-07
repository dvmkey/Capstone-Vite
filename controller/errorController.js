const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;
    
    res.status(statusCode).json({
        status,
        message,
        stack,
        error,
    });
}


const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;
    
    if (error.isOperational) {
        res.status(statusCode).json({
            status,
            message,
        });
        return;
    }
    return res.status(statusCode).json({
        status,
        message: 'Something went wrong',
    });
}

const globalErrorHandler = (err, req, res, next) => {
    if (err.name == 'SequelizeUniqueConstraintError') {
        err = new AppError(err.errors[0].message, 400);
    }
      if(process.env.NODE_ENV === 'development'){
        return sendErrorDev(err, res);
      }
    if(err.name === 'JsonWebTokenError'){
        err = new AppError('Invalid token', 401);
    }
      sendErrorProd(err, res);
};
module.exports = globalErrorHandler;