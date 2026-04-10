const API_URL = 'http://localhost:3000';

const alertBox = document.getElementById('alertBox');
const cotizacionForm = document.getElementById('cotizacionForm');
const productoSelect = document.getElementById('producto_id');
const cantidadInput = document.getElementById('cantidad');
const precioUnitarioInput = document.getElementById('precio_unitario');
const totalEstimadoInput = document.getElementById('total_estimado');
const tablaCotizaciones = document.getElementById('tablaCotizaciones');
const filtroCliente = document.getElementById('filtroCliente');
const filtroFecha = document.getElementById('filtroFecha');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('btnLimpiar');
const logoutBtn = document.getElementById('logoutBtn');

let productos = [];

function showAlert(message, type = 'danger') {
  alertBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
}

function clearAlert() {
  alertBox.innerHTML = '';
}

function calcularTotal() {
  const productoId = productoSelect.value;
  const cantidad = Number(cantidadInput.value);

  const producto = productos.find(p => String(p.id) === String(productoId));

  if (!producto || !cantidad || cantidad <= 0) {
    precioUnitarioInput.value = '';
    totalEstimadoInput.value = '';
    return;
  }

  const precio = Number(producto.precio_unitario);
  precioUnitarioInput.value = precio.toFixed(2);
  totalEstimadoInput.value = (precio * cantidad).toFixed(2);
}

async function cargarProductos() {
  try {
    const response = await fetch(`${API_URL}/api/productos`, {
      credentials: 'include'
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = './login.html';
        return;
      }

      showAlert(result.message || 'No se pudieron cargar los productos');
      return;
    }

    productos = result.data;
    productoSelect.innerHTML = '<option value=\"\">Seleccione un producto</option>';

    productos.forEach(producto => {
      productoSelect.innerHTML += `
        <option value="${producto.id}">
          ${producto.nombre_producto} - L ${Number(producto.precio_unitario).toFixed(2)}
        </option>
      `;
    });
  } catch (error) {
    console.error(error);
    showAlert('Error de conexión al cargar productos');
  }
}

function renderTabla(cotizaciones) {
  if (!cotizaciones.length) {
    tablaCotizaciones.innerHTML = `
      <tr>
        <td colspan="8" class="text-center">No hay cotizaciones registradas</td>
      </tr>
    `;
    return;
  }

  tablaCotizaciones.innerHTML = cotizaciones.map(cotizacion => `
    <tr>
      <td>${cotizacion.id}</td>
      <td>${cotizacion.cliente_nombre}</td>
      <td>${cotizacion.nombre_producto}</td>
      <td>${cotizacion.cantidad}</td>
      <td>L ${Number(cotizacion.precio_unitario).toFixed(2)}</td>
      <td>L ${Number(cotizacion.total).toFixed(2)}</td>
      <td>${String(cotizacion.fecha_cotizacion).slice(0, 10)}</td>
      <td class="table-actions">
        <a href="./detalle.html?id=${cotizacion.id}" class="btn btn-sm btn-info">Detalle</a>
        <button class="btn btn-sm btn-danger" onclick="eliminarCotizacion(${cotizacion.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function cargarCotizaciones() {
  try {
    const cliente = filtroCliente.value.trim();
    const fecha = filtroFecha.value;
    const params = new URLSearchParams();

    if (cliente) params.append('cliente', cliente);
    if (fecha) params.append('fecha', fecha);

    const url = `${API_URL}/api/cotizaciones${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await fetch(url, {
      credentials: 'include'
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = './login.html';
        return;
      }

      showAlert(result.message || 'No se pudieron cargar las cotizaciones');
      return;
    }

    renderTabla(result.data);
  } catch (error) {
    console.error(error);
    showAlert('Error de conexión al cargar cotizaciones');
  }
}

cotizacionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearAlert();

  const payload = {
    producto_id: Number(productoSelect.value),
    cliente_nombre: document.getElementById('cliente_nombre').value.trim(),
    cantidad: Number(cantidadInput.value),
    fecha_cotizacion: document.getElementById('fecha_cotizacion').value
  };

  try {
    const response = await fetch(`${API_URL}/api/cotizaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = './login.html';
        return;
      }

      showAlert(result.message || 'No se pudo crear la cotización');
      return;
    }

    showAlert(result.message || 'Cotización creada correctamente', 'success');
    cotizacionForm.reset();
    precioUnitarioInput.value = '';
    totalEstimadoInput.value = '';
    await cargarCotizaciones();
  } catch (error) {
    console.error(error);
    showAlert('Error de conexión al crear la cotización');
  }
});

async function eliminarCotizacion(id) {
  const confirmado = confirm(`¿Deseas eliminar la cotización ${id}?`);

  if (!confirmado) return;

  try {
    const response = await fetch(`${API_URL}/api/cotizaciones/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = './login.html';
        return;
      }

      showAlert(result.message || 'No se pudo eliminar la cotización');
      return;
    }

    showAlert(result.message || 'Cotización eliminada correctamente', 'success');
    await cargarCotizaciones();
  } catch (error) {
    console.error(error);
    showAlert('Error de conexión al eliminar la cotización');
  }
}

async function logout() {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    await response.json();
    window.location.href = './login.html';
  } catch (error) {
    console.error(error);
    showAlert('No se pudo cerrar la sesión');
  }
}

productoSelect.addEventListener('change', calcularTotal);
cantidadInput.addEventListener('input', calcularTotal);
btnBuscar.addEventListener('click', cargarCotizaciones);
btnLimpiar.addEventListener('click', () => {
  filtroCliente.value = '';
  filtroFecha.value = '';
  cargarCotizaciones();
});
logoutBtn.addEventListener('click', logout);

window.eliminarCotizacion = eliminarCotizacion;

(async function init() {
  await cargarProductos();
  await cargarCotizaciones();
})();