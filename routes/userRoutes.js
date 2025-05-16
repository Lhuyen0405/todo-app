const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');



// USER routes
router.get('/get', authenticateToken, userController.getAllUsers);

module.exports = router;
