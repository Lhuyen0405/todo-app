const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { sendJsonResponse } = require('../utils/response');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.getCurrentUser);
router.post('/type', authenticateToken, authController.createType);
router.get('/types', authenticateToken, authController.getTypes);
router.post('/todos', authenticateToken, authController.createTodo);
router.get('/todos', authenticateToken, authController.getTodos);
router.put('/todos/:id', authenticateToken, authController.updateTodo);

router.get('/', (req, res) => {
    sendJsonResponse(res, 200, { message: 'Welcome to Node.js Express API' });
});

module.exports = router;