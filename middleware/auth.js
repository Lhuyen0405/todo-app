const jwt = require('jsonwebtoken');
const { sendJsonResponse } = require('../utils/response');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return sendJsonResponse(res, 401, { message: 'Không tìm thấy token xác thực' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return sendJsonResponse(res, 401, { message: 'Không tìm thấy token xác thực' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return sendJsonResponse(res, 403, { message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
}

module.exports = { authenticateToken };