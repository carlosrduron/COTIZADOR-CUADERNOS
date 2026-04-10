-- Contraseña de prueba: Cuaderno2026! 
-- Hash bcrypt: $2a$12$LIRdF9xlP4KirpnJFMHg2uQ3mUlHrMybNgLB.INw5PxJ3nPJuo4/.

USE cotizador_cuadernos;

INSERT INTO usuarios (nombre, email, password_hash, activo)
VALUES
('Cliente Demo', 'cliente1@demo.com', '$2a$12$LIRdF9xlP4KirpnJFMHg2uQ3mUlHrMybNgLB.INw5PxJ3nPJuo4/.', 1);

INSERT INTO productos (nombre_producto, tipo_cuaderno, tamano, numero_paginas, tipo_pasta, precio_unitario, activo)
VALUES
('Cuaderno Escolar Básico', 'Escolar', 'Carta', 100, 'Suave', 35.00, 1),
('Cuaderno Universitario', 'Universitario', 'Oficio', 200, 'Dura', 65.00, 1),
('Cuaderno Ejecutivo', 'Ejecutivo', 'Media carta', 150, 'Dura', 50.00, 1);

INSERT INTO cotizaciones (
  usuario_id,
  producto_id,
  cliente_nombre,
  cantidad,
  tamano,
  numero_paginas,
  tipo_pasta,
  precio_unitario,
  total,
  estado,
  fecha_cotizacion
)
VALUES
(1, 1, 'Librería Central', 10, 'Carta', 100, 'Suave', 35.00, 350.00, 'enviada', '2026-04-10'),
(1, 2, 'Papelería Moderna', 5, 'Oficio', 200, 'Dura', 65.00, 325.00, 'enviada', '2026-04-10');