const pool = require('../config/db');

async function getActiveProducts() {
  const [rows] = await pool.query(`
    SELECT 
      id,
      nombre_producto,
      tipo_cuaderno,
      tamano,
      numero_paginas,
      tipo_pasta,
      precio_unitario
    FROM productos
    WHERE activo = 1
    ORDER BY id ASC
  `);

  return rows;
}

module.exports = {
  getActiveProducts
};