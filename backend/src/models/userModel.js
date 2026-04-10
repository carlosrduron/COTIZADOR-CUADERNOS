const pool = require('../config/db');

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, nombre, email, password_hash, activo FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
}

module.exports = {
  findUserByEmail
};