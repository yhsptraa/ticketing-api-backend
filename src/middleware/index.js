const authMiddleware = require('./authentication');
const isAdmin = require('./authorization');

module.exports = {
    authMiddleware,
    isAdmin,
};
