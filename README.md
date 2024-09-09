# Proyecto Final: Neighbors

![image](https://github.com/user-attachments/assets/61e20a20-161d-4bee-865b-1a292cdf56d5)

## Descripción 

**"Neighbors"** es una aplicación integral para la gestión y comunicación dentro de un edificio de apartamentos, utilizando un enfoque moderno con tecnologías como React, Flask, SQLAlchemy, y más. La aplicación facilita la interacción entre vecinos (neighbors), vendedores (sellers) y administradores (admins), permitiendo una experiencia fluida para compras, trueques, anuncios y gestión del edificio.

## Tecnologías utilizadas:

- **Frontend:** Javascript, React, Bootstrap, Cloudinary
- **Backend:** Flask, SQLAlchemy, Python
- **Base de Datos:** PostgreSQL (SQLAlchemy)
- **Otras herramientas:** Postman, WhatsApp

## Características principales

### Roles y Permisos

**Vecino (Neighbor):**
- Perfil personal editable.
- Visita perfiles de vendedores y visualiza tiendas.
- Accede al directorio completo del edificio.

**Vendedor (Seller):**
- Perfil personal editable.
- Crea y gestiona una tienda: establece precios, horarios y descripciones de productos.

**Administrador (Admin):**
- Accede a todas las funciones de un vecino y vendedor.
- Administra la entrada y salida de residentes.
- Elimina residentes y todo su contenido asociado.

### Funcionalidades CRUD

- Crear, Leer, Actualizar y Eliminar (CRUD) operaciones para perfiles de vecinos, vendedores y tiendas.
- Gestión completa de productos y anuncios en la tienda de los vendedores.
- Gestión y administración de usuarios por parte de los administradores.

### Integración con WhatsApp:

Permite a los usuarios realizar compras, trueques y anuncios a través de WhatsApp, facilitando la comunicación directa con vendedores y otros residentes.

## Interfaz del Usuario

### Perfil del Usuario 
- **Edita** y **visualiza** los detalles personales.
- **Directorio:** Lista completa de todos los residentes del edificio.
- **Tienda del Vendedor:** Visualiza y gestiona productos con detalles completos.

### Backend y API:

- **Flask y SQLAlchemy** para la gestión del backend y operaciones de base de datos.
- **Endpoints RESTful** para manejar operaciones CRUD y autenticación de usuarios.
- Utiliza **Postman** para probar los endpoints del backend y asegura la integración con el frontend.

### Despliegue y Gestión de Imágenes

- **Cloudinary** para el almacenamiento y gestión de imágenes en la aplicación.
- **Render** para el despliegue de la página

