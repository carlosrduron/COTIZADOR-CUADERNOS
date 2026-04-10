const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const {
  createCotizacion,
  getCotizacionesTodas,
  getCotizacionDetalle,
  deleteCotizacion
} = require('../controllers/cotizacionController');

router.post('/', authMiddleware, createCotizacion);
router.get('/', authMiddleware, getCotizacionesTodas);
router.get('/:id', authMiddleware, getCotizacionDetalle);
router.delete('/:id', authMiddleware, deleteCotizacion);

module.exports = router;