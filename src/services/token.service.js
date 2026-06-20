const jwt = require('jsonwebtoken');
const crypto = require('crypto');

generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user.id,
            role: user.Role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '15m'
        }
    );
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};