const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const { getProducts } = require('../controllers/productoController');

router.get('/', authMiddleware, getProducts);

module.exports = router;