# API de Cotizaciones de Cuadernos

## Descripción
Proyecto MVP técnico desarrollado para gestionar un flujo básico de cotización de cuadernos.  
Incluye autenticación con sesión local, consulta de productos, creación de cotizaciones, listado, detalle, filtros por cliente y fecha, eliminación y cierre de sesión.

El sistema está compuesto por:

- Frontend en HTML, CSS, JavaScript vanilla y Bootstrap
- Backend en Node.js con Express
- Base de datos MySQL

---

## Objetivo del proyecto
Demostrar una prueba funcional local de un sistema API de cotizaciones de cuadernos, con flujo completo entre frontend, backend y base de datos.

---

## Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap 5

### Backend
- Node.js
- Express
- express-session
- mysql2
- cors
- dotenv
- bcrypt

### Base de datos
- MySQL

### Herramientas de trabajo
- Visual Studio Code
- MySQL Workbench
- Postman
- Live Server

---

## Alcance funcional
El sistema permite:

- iniciar sesión
- cerrar sesión
- consultar productos
- crear cotizaciones
- listar cotizaciones
- filtrar cotizaciones por cliente
- filtrar cotizaciones por fecha
- ver detalle de cotización
- eliminar cotizaciones

---

## Requisitos previos
Antes de ejecutar el proyecto se debe tener instalado:

- Node.js
- npm
- MySQL Server
- MySQL Workbench o cliente SQL similar
- Visual Studio Code
- Postman
- Extensión Live Server para VS Code

---

## Estructura del proyecto

```text
cotizador-cuadernos/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productoController.js
│   │   │   └── cotizacionController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── productoModel.js
│   │   │   └── cotizacionModel.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productoRoutes.js
│   │   │   └── cotizacionRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── cotizacionService.js
│   │   └── app.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── pages/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   └── detalle.html
│   ├── js/
│   │   ├── auth.js
│   │   ├── login.js
│   │   ├── dashboard.js
│   │   └── detalle.js
│   └── css/
│       └── styles.css
│
├── database/
│   ├── schema.sql
│   └── seeds.sql
│
└── README.md

###################################
# CONFIGURACIÓN DE LA BASE DE DATOS
###################################

1. Crear la base de datos
Abrir MySQL Workbench y ejecutar el contenido de:
    database/schema.sql

2. Insertar los datos
Ejecutar luego el contenido de
    database/seeds.sql

Esto creará:
    -tabla usuarios
    -tabla productos
    -tabla cotizaciones
y cargará los datos de prueba.

###########################
# CONFIGURACIÓN DEL BACKEND
###########################

1. Entrar a la carpeta backend
    cd backend

2. Instalar dependencias
    npm install

3. Crear o verificar archivo .env
Ejemplo:
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=TU_PASSWORD_MYSQL
    DB_NAME=cotizador_cuadernos
    SESSION_SECRET=mi_clave_super_secreta_123

Se debe reemplazar TU_PASSWORD_MYSQL por la contraseña real del servidor MySQL.

4. Ejecutar el backend
    node src/app.js
quedará disponible en: http://localhost:3000

############################
# CONFIGURACIÓN DEL FRONTEND
############################

Rutas de inicio:
----------------
    - http://localhost:5500/frontend/pages/login.html
    *se recomienda utilizar localhost y no 127.0.0.1 para evitar problemas con la sesión.

Credenciales de prueba:
-----------------------
    - Correo: cliente1@demo.com
    - Contraseña: Cuaderno2026!

Flujo de uso:
-------------
    1. Iniciar sesión
    2. Consultar productos
    3. Crear una cotización
    4. Ver la cotización en el listado
    5. Filtrar por cliente o fecha
    6. Ver detalle
    7. Eliminar cotización si es necesario
    8. Cerrar sesión

Endpoints del API
-----------------

    POST /api/auth/login    :   Inicia sesión con email y contraseña
        Request JSON
            {
                "email": "cliente1@demo.com",
                "password": "Cuaderno2026!"
            }
        
        Response JSON
            {
                "message": "Login exitoso",
                "user": {
                    "id": 1,
                    "nombre": "Cliente Demo",
                    "email": "cliente1@demo.com"
                }
            }

    POST /api/auth/logout   :   Cierra la sesión activa
        Response JSON
            {
                "message": "Sesión cerrada correctamente"
            }

    GET /api/auth/profile   :   Obtiene la sesión actual del usuario autenticado
        Response JSON
            {
                "message": "Ruta protegida autorizada",
                "user": {
                    "id": 1,
                    "nombre": "Cliente Demo",
                    "email": "cliente1@demo.com"
                }
            }

    GET /api/productos  :   Lista productos activos. Requiere sesión
        Response JSON
            {
                "message": "Productos obtenidos correctamente",
                "data": [
                    {
                    "id": 1,
                    "nombre_producto": "Cuaderno Escolar Básico",
                    "tipo_cuaderno": "Escolar",
                    "tamano": "Carta",
                    "numero_paginas": 100,
                    "tipo_pasta": "Suave",
                    "precio_unitario": "35.00"
                    }
                ]
            }

    POST /api/cotizaciones  :   Crea una nueva cotización. Requiere sesión.
        Request JSON
            {
                "producto_id": 1,
                "cliente_nombre": "Papelería Escolar La Fe",
                "cantidad": 12,
                "fecha_cotizacion": "2026-04-10"
            }

        Response JSON
            {
                "message": "Cotización creada correctamente",
                "data": {
                    "id": 3,
                    "cliente_nombre": "Papelería Escolar La Fe",
                    "cantidad": 12,
                    "precio_unitario": "35.00",
                    "total": "420.00",
                    "estado": "enviada"
                }
            }

    GET /api/cotizaciones   :   Lista todas las cotizaciones
        También permite filtros
            GET /api/cotizaciones?cliente=Papelería
            GET /api/cotizaciones?fecha=2026-04-10
            GET /api/cotizaciones?cliente=Papelería&fecha=2026-04-10

    GET /api/cotizaciones/:id   :   Obtiene el detalle de una cotización por ID

    DELETE /api/cotizaciones/:id    :   Eliminar una cotización por ID
        Response JSON
            {
                "message": "Cotización eliminada correctamente"
            }

Reglas de negocio aplicadas
---------------------------
    solo usuarios autenticados pueden consultar o crear información
    todos los campos obligatorios deben validarse
    el precio unitario se toma del producto
    el total se calcula automáticamente con la fórmula:
        cantidad x precio_unitario
    el estado de la cotización es 'enviada'
    no existe edición de cotizaciones
    no existe registro público de usuarios

Datos de prueba iniciales
-------------------------
    Productos
        -Cuaderno Escolar Básico
        -Cuaderno Universitario
        -Cuaderno Ejecutivo
    Usuario
        -Cliente Demo

# AUTOR
Proyecto desarrollado por Carlos René Fernando Sarmiento Durón, como prueba MVP técnica para un sistema de cotización de cuadernos.