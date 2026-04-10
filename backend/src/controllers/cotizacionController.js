const {
  createCotizacionService,
  getCotizacionPorIdService,
  getCotizacionesService,
  deleteCotizacionService
} = require('../services/cotizacionService');

async function createCotizacion(req, res) {
  try {
    const result = await createCotizacionService(req.body, req.session.user);

    return res.status(result.status).json(
      result.success
        ? { message: result.message, data: result.data }
        : { message: result.message }
    );
  } catch (error) {
    console.error('Error al crear cotización:', error);
    return res.status(500).json({
      message: 'Error interno al crear cotización',
      error: error.message
    });
  }
}

async function getCotizacionesTodas(req, res) {
  try {
    const { cliente, fecha } = req.query;

    const result = await getCotizacionesService({ cliente, fecha });

    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error al listar cotizaciones:', error);
    return res.status(500).json({
      message: 'Error interno al listar cotizaciones',
      error: error.message
    });
  }
}

async function getCotizacionDetalle(req, res) {
  try {
    const { id } = req.params;
    const result = await getCotizacionPorIdService(id);

    return res.status(result.status).json(
      result.success
        ? { message: result.message, data: result.data }
        : { message: result.message }
    );
  } catch (error) {
    console.error('Error al obtener detalle de cotización:', error);
    return res.status(500).json({
      message: 'Error interno al obtener detalle de cotización',
      error: error.message
    });
  }
}

async function deleteCotizacion(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteCotizacionService(id);

    return res.status(result.status).json({
      message: result.message
    });
  } catch (error) {
    console.error('Error al eliminar cotización:', error);
    return res.status(500).json({
      message: 'Error interno al eliminar cotización',
      error: error.message
    });
  }
}

module.exports = {
  createCotizacion,
  getCotizacionesTodas,
  getCotizacionDetalle,
  deleteCotizacion
};