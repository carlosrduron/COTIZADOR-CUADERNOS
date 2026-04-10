const pool = require('../config/db');

async function findProductById(productId) {
  const [rows] = await pool.query(
    `SELECT 
      id,
      nombre_producto,
      tipo_cuaderno,
      tamano,
      numero_paginas,
      tipo_pasta,
      precio_unitario,
      activo
     FROM productos
     WHERE id = ? AND activo = 1
     LIMIT 1`,
    [productId]
  );

  return rows[0] || null;
}

async function createCotizacion(data) {
  const {
    usuario_id,
    producto_id,
    cliente_nombre,
    cantidad,
    tamano,
    numero_paginas,
    tipo_pasta,
    precio_unitario,
    total,
    estado,
    fecha_cotizacion
  } = data;

  const [result] = await pool.query(
    `INSERT INTO cotizaciones (
      usuario_id,
      producto_id,
      cliente_nombre,
      cantidad,
      tamano,
      numero_paginas,
      tipo_pasta,
      precio_unitario,
      total,
      estado,
      fecha_cotizacion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      usuario_id,
      producto_id,
      cliente_nombre,
      cantidad,
      tamano,
      numero_paginas,
      tipo_pasta,
      precio_unitario,
      total,
      estado,
      fecha_cotizacion
    ]
  );

  return result.insertId;
}

async function getCotizacionPorId(id) {
  const [rows] = await pool.query(
    `SELECT 
      c.id,
      c.usuario_id,
      c.producto_id,
      c.cliente_nombre,
      c.cantidad,
      c.tamano,
      c.numero_paginas,
      c.tipo_pasta,
      c.precio_unitario,
      c.total,
      c.estado,
      c.fecha_cotizacion,
      c.created_at,
      p.nombre_producto,
      u.nombre AS usuario_nombre,
      u.email AS usuario_email
     FROM cotizaciones c
     INNER JOIN productos p ON c.producto_id = p.id
     INNER JOIN usuarios u ON c.usuario_id = u.id
     WHERE c.id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
}

async function getCotizaciones(filters = {}) {
  const { cliente, fecha } = filters;

  let query = `
    SELECT 
      c.id,
      c.cliente_nombre,
      c.cantidad,
      c.precio_unitario,
      c.total,
      c.estado,
      c.fecha_cotizacion,
      p.nombre_producto
    FROM cotizaciones c
    INNER JOIN productos p ON c.producto_id = p.id
    WHERE 1 = 1
  `;

  const params = [];

  if (cliente) {
    query += ` AND c.cliente_nombre LIKE ?`;
    params.push(`%${cliente}%`);
  }

  if (fecha) {
    query += ` AND c.fecha_cotizacion = ?`;
    params.push(fecha);
  }

  query += ` ORDER BY c.id DESC`;

  const [rows] = await pool.query(query, params);
  return rows;
}

async function deleteCotizacionPorId(id) {
  const [result] = await pool.query(
    'DELETE FROM cotizaciones WHERE id = ?',
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  findProductById,
  createCotizacion,
  getCotizacionPorId,
  getCotizaciones,
  deleteCotizacionPorId
};