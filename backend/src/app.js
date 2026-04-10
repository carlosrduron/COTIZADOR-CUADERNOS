const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');
const cotizacionRoutes = require('./routes/cotizacionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.get('/', (req, res) => {
  res.send('Backend de cotizador de cuadernos funcionando');
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre_producto, precio_unitario FROM productos');
    res.json({
      message: 'Consulta a productos exitosa',
      data: rows
    });
  } catch (error) {
    console.error('Error de conexión a MySQL:', error);
    res.status(500).json({
      message: 'Error al consultar MySQL',
      error: error.message
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/cotizaciones', cotizacionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});