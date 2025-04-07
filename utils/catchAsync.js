const catchAsync = (fn) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Expected a function');
    }
    const errorHandler = (req, res, next) => {
        fn(req, res, next).catch(next);
    };
    return errorHandler;
};
module.exports = catchAsync;
