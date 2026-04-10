const { loginUser } = require('../services/authService');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y contraseña son obligatorios'
      });
    }

    const result = await loginUser(email, password);

    if (!result.success) {
      return res.status(result.status).json({
        message: result.message
      });
    }

    req.session.user = result.user;

    return res.status(200).json({
      message: result.message,
      user: result.user
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      message: 'Error interno al iniciar sesión',
      error: error.message
    });
  }
}

function logout(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error('Error al cerrar sesión:', error);
      return res.status(500).json({
        message: 'Error al cerrar sesión'
      });
    }

    res.clearCookie('connect.sid');

    return res.status(200).json({
      message: 'Sesión cerrada correctamente'
    });
  });
}

function profile(req, res) {
  return res.status(200).json({
    message: 'Ruta protegida autorizada',
    user: req.session.user
  });
}

module.exports = {
  login,
  logout,
  profile
};