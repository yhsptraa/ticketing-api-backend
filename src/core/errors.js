const errorTypes = {
    VALIDATION: 'VALIDATION',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
    NOT_FOUND: 'NOT_FOUND',
    FORBIDDEN: 'FORBIDDEN',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const errorStatus = {
    [errorTypes.VALIDATION]: 400,
    [errorTypes.INVALID_CREDENTIALS]: 401,
    [errorTypes.EMAIL_ALREADY_TAKEN]: 400,
    [errorTypes.NOT_FOUND]: 404,
    [errorTypes.FORBIDDEN]: 403,
    [errorTypes.INTERNAL_SERVER_ERROR]: 500,
};

function errorResponder(type, message) {
    const error = new Error(message);
    error.type = type;
    error.status = errorStatus[type] || 500;
    return error;
}

module.exports = { errorTypes, errorResponder };
