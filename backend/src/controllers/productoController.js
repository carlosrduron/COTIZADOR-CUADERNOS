const { getActiveProducts } = require('../models/productoModel');

async function getProducts(req, res) {
  try {
    const products = await getActiveProducts();

    return res.status(200).json({
      message: 'Productos obtenidos correctamente',
      data: products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);

    return res.status(500).json({
      message: 'Error interno al obtener productos',
      error: error.message
    });
  }
}

module.exports = {
  getProducts
};