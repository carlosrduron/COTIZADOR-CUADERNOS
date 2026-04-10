CREATE DATABASE IF NOT EXISTS cotizador_cuadernos;

USE cotizador_cuadernos;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  tipo_cuaderno VARCHAR(100) NOT NULL,
  tamano VARCHAR(50) NOT NULL,
  numero_paginas INT NOT NULL,
  tipo_pasta VARCHAR(50) NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cotizaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  cliente_nombre VARCHAR(120) NOT NULL,
  cantidad INT NOT NULL,
  tamano VARCHAR(50) NOT NULL,
  numero_paginas INT NOT NULL,
  tipo_pasta VARCHAR(50) NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'enviada',
  fecha_cotizacion DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cotizaciones_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_cotizaciones_producto FOREIGN KEY (producto_id) REFERENCES productos(id)
);