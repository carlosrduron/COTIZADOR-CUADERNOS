const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const { login, logout, profile } = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authMiddleware, profile);

module.exports = router;