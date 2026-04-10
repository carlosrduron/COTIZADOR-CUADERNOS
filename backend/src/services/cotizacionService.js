const {
  findProductById,
  createCotizacion,
  getCotizacionPorId,
  getCotizaciones,
  deleteCotizacionPorId
} = require('../models/cotizacionModel');

async function createCotizacionService(payload, sessionUser) {
  const {
    producto_id,
    cliente_nombre,
    cantidad,
    fecha_cotizacion
  } = payload;

  if (!producto_id || !cliente_nombre || !cantidad || !fecha_cotizacion) {
    return {
      success: false,
      status: 400,
      message: 'producto_id, cliente_nombre, cantidad y fecha_cotizacion son obligatorios'
    };
  }

  if (Number(cantidad) <= 0) {
    return {
      success: false,
      status: 400,
      message: 'La cantidad debe ser mayor que cero'
    };
  }

  const product = await findProductById(producto_id);

  if (!product) {
    return {
      success: false,
      status: 404,
      message: 'Producto no encontrado o inactivo'
    };
  }

  const precio_unitario = Number(product.precio_unitario);
  const total = Number(cantidad) * precio_unitario;

  const quotationData = {
    usuario_id: sessionUser.id,
    producto_id: product.id,
    cliente_nombre,
    cantidad: Number(cantidad),
    tamano: product.tamano,
    numero_paginas: product.numero_paginas,
    tipo_pasta: product.tipo_pasta,
    precio_unitario,
    total,
    estado: 'enviada',
    fecha_cotizacion
  };

  const insertId = await createCotizacion(quotationData);
  const createdQuotation = await getCotizacionPorId(insertId);

  return {
    success: true,
    status: 201,
    message: 'Cotización creada correctamente',
    data: createdQuotation
  };
}

async function getCotizacionPorIdService(id) {
  const quotation = await getCotizacionPorId(id);

  if (!quotation) {
    return {
      success: false,
      status: 404,
      message: 'Cotización no encontrada'
    };
  }

  return {
    success: true,
    status: 200,
    message: 'Detalle de cotización obtenido correctamente',
    data: quotation
  };
}

async function getCotizacionesService(filters) {
  const quotations = await getCotizaciones(filters);

  return {
    success: true,
    status: 200,
    message: 'Cotizaciones obtenidas correctamente',
    data: quotations
  };
}

async function deleteCotizacionService(id) {
  const existingQuotation = await getCotizacionPorId(id);

  if (!existingQuotation) {
    return {
      success: false,
      status: 404,
      message: 'Cotización no encontrada'
    };
  }

  await deleteCotizacionPorId(id);

  return {
    success: true,
    status: 200,
    message: 'Cotización eliminada correctamente'
  };
}

module.exports = {
  createCotizacionService,
  getCotizacionPorIdService,
  getCotizacionesService,
  deleteCotizacionService
};