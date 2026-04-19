const errorTypes = {
    SERVER: {
        description: 'Server error occurred',
        status: 500,
        code: 'SERVER_ERROR',
    },
    BAD_REQUEST: {
        description: 'Bad request',
        status: 400,
        code: 'BAD_REQUEST_ERROR',
    },
    VALIDATION: {
        description: 'Invalid request',
        status: 400,
        code: 'VALIDATION_ERROR',
    },
    FORBIDDEN: {
        description: 'Access forbidden',
        status: 403,
        code: 'FORBIDDEN_ERROR',
    },
    NO_ANONYMOUS_ACCESS: {
        description: 'Access denied. No anonymous access',
        status: 403,
        code: 'NO_ANONYMOUS_ACCESS_ERROR',
    },
    BAD_ROLE: {
        description: 'Bad role',
        status: 403,
        code: 'BAD_ROLE_ERROR',
    },
    INVALID_CREDENTIALS: {
        description: 'Invalid credentials',
        status: 403,
        code: 'INVALID_CREDENTIALS_ERROR',
    },
    INVALID_PASSWORD: {
        description: 'Invalid password',
        status: 403,
        code: 'INVALID_PASSWORD_ERROR',
    },
    TOKEN_VERIFY: {
        description: 'Token verify error',
        status: 401,
        code: 'TOKEN_VERIFY_ERROR',
    },
    EMAIL_ALREADY_TAKEN: {
        description: 'This email already taken, try use another',
        status: 409,
        code: 'EMAIL_ALREADY_TAKEN_ERROR',
    },
    NOT_FOUND: {
        description: 'Empty response, not found',
        status: 404,
        code: 'NOT_FOUND_ERROR',
    },
    UNPROCESSABLE_ENTITY: {
        description: 'Unprocessable entity',
        status: 422,
        code: 'UNPROCESSABLE_ENTITY_ERROR',
    },
    DB_DUPLICATE_CONFLICT: {
        description: 'Duplicate conflict. Resource already exists',
        status: 409,
        code: 'DB_DUPLICATE_CONFLICT_ERROR',
    },
};

const errorResponder = (errorType, message = '') => {
    const error = new Error(message);

    if (errorType) {
        error.code = errorType.code || 'UNKNOWN_ERROR';
        error.status = errorType.status || 500;
        error.description = errorType.description || 'Unknown error occurred';
    }

    return error;
};

module.exports = { errorTypes, errorResponder };
