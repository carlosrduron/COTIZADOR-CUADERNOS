const API_URL = 'http://localhost:3000';

const alertBox = document.getElementById('alertBox');
const detalleContainer = document.getElementById('detalleContainer');

function showAlert(message, type = 'danger') {
  alertBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
}

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function cargarDetalle() {
  const id = getIdFromUrl();

  if (!id) {
    showAlert('No se recibió el ID de la cotización');
    detalleContainer.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/cotizaciones/${id}`, {
      credentials: 'include'
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = './login.html';
        return;
      }

      showAlert(result.message || 'No se pudo cargar el detalle');
      detalleContainer.innerHTML = '';
      return;
    }

    const c = result.data;

    detalleContainer.innerHTML = `
      <div class="row g-3">
        <div class="col-md-6"><strong>ID:</strong> ${c.id}</div>
        <div class="col-md-6"><strong>Cliente:</strong> ${c.cliente_nombre}</div>
        <div class="col-md-6"><strong>Producto:</strong> ${c.nombre_producto}</div>
        <div class="col-md-6"><strong>Cantidad:</strong> ${c.cantidad}</div>
        <div class="col-md-6"><strong>Tamaño:</strong> ${c.tamano}</div>
        <div class="col-md-6"><strong>Número de páginas:</strong> ${c.numero_paginas}</div>
        <div class="col-md-6"><strong>Tipo de pasta:</strong> ${c.tipo_pasta}</div>
        <div class="col-md-6"><strong>Precio unitario:</strong> L ${Number(c.precio_unitario).toFixed(2)}</div>
        <div class="col-md-6"><strong>Total:</strong> L ${Number(c.total).toFixed(2)}</div>
        <div class="col-md-6"><strong>Estado:</strong> ${c.estado}</div>
        <div class="col-md-6"><strong>Fecha:</strong> ${String(c.fecha_cotizacion).slice(0, 10)}</div>
        <div class="col-md-6"><strong>Usuario:</strong> ${c.usuario_nombre}</div>
        <div class="col-md-6"><strong>Correo usuario:</strong> ${c.usuario_email}</div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    showAlert('Error de conexión al cargar el detalle');
    detalleContainer.innerHTML = '';
  }
}

cargarDetalle();