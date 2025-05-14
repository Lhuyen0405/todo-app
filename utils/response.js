function sendJsonResponse(res, statusCode, data) {
    return res.status(statusCode).json(data);
}

function handleServerError(res, error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Server error' });
}

module.exports = {
    sendJsonResponse,
    handleServerError,
};