const API_URL = 'http://localhost:3000';

const loginForm = document.getElementById('loginForm');
const alertBox = document.getElementById('alertBox');

function showAlert(message, type = 'danger') {
  alertBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      showAlert(result.message || 'Error al iniciar sesión');
      return;
    }

    showAlert('Login exitoso. Redirigiendo...', 'success');

    setTimeout(() => {
      window.location.href = './dashboard.html';
    }, 800);
  } catch (error) {
    showAlert('No se pudo conectar con el servidor');
    console.error(error);
  }
});