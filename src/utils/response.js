const sendSuccess = (res, message, data = null) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};

const sendCreated = (res, message, data = null) => {
    return res.status(201).json({
        success: true,
        message,
        data
    });
};

const sendError = (res, message, code = 500) => {
    return res.status(code).json({
        success: false,
        error: message
    });
};

module.exports = {
    sendSuccess,
    sendCreated,
    sendError
};