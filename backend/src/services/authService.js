const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../models/userModel');

async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      status: 401,
      message: 'Credenciales inválidas'
    };
  }

  if (!user.activo) {
    return {
      success: false,
      status: 403,
      message: 'Usuario inactivo'
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    return {
      success: false,
      status: 401,
      message: 'Credenciales inválidas'
    };
  }

  return {
    success: true,
    status: 200,
    message: 'Login exitoso',
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    }
  };
}

module.exports = {
  loginUser
};