# 🌿 **YerbaShop** 🍃
 

![YerbaShop Logo]()

**YerbaShop** es una tienda en línea construida con **Angular**. Esta aplicación permite a los usuarios explorar una variedad de yerbas, agregar productos a su carrito, realizar compras, y consultar consejos sobre la mejor manera de preparar su mate.

---

## 🌟 **Características** ✨

- 🛍️ **Explora productos**: Visualiza productos en la tienda y conoce sus características.
- 🛒 **Carrito de compras**: Añade productos al carrito, elimina productos y calcula el total.
- 💥 **Ofertas**: Filtra los productos en oferta directamente desde la página principal.
- 📚 **Consejos**: Accede a consejos útiles sobre los distintos tipos de yerba y cómo afectan el sabor del mate.
- ✅ **Proceso de compra**: Completa un formulario con tus datos y confirma la compra.

---

## 🛠️ **Tecnologías utilizadas** 🚀

- 🔹 **Angular**: Framework principal para el desarrollo de la aplicación.
- 🔸 **RxJS**: Para manejar la reactividad y el flujo de datos.
- 🔹 **Bootstrap**: Framework CSS utilizado para el diseño responsivo y la interfaz de usuario.
- 🔸 **HttpClient**: Para realizar peticiones HTTP y obtener datos de una API externa.

---

## 🖥️ **Desarrollo** 🧑‍💻

### Backend API

The `server/` directory contains the YerbaShop Node.js/Express API. It uses
Sequelize and supports MySQL (default) or PostgreSQL through environment
variables. Copy `.env.example` to `.env`, create the configured database, and
run:

```bash
npm install
npm run backend:start
```

### Docker (MySQL + API + frontend)

Docker Compose starts MySQL 8, the API, and an Nginx-served Angular
frontend. MySQL data is kept in the `mysql-data` named volume. The API waits
for MySQL to become healthy, runs the idempotent seed, and then starts.

```bash
docker compose up --build
```

Open <http://localhost:8080>. The development seed creates these products and
the following administrator account:

```text
Email:    admin@yerbashop.com
Password: admin123
```

These credentials and the Compose database password are development defaults;
change them before using this stack outside local development. To remove the
database volume and start from an empty database, run
`docker compose down -v`.

For development, use `npm run backend:dev`. The API listens on port 3000 and
allows the Angular app at `http://localhost:4200` by default. Endpoints include
`POST /api/auth/register`, `POST /api/auth/login`, `GET /api/products`,
`GET /api/products/:id`, authenticated `GET /api/users/me`, and authenticated
`POST /api/reviews/:productId` (also available as
`POST /api/reviews/products/:productId` for compatibility).

Admin product create and update endpoints accept `multipart/form-data` with an
optional `imagen` field. Uploaded images are stored in `server/uploads` and
served at `/uploads/<filename>`; an existing frontend asset can still be sent
as the `imagen_url` field.

The product classification schema is also captured in
`server/migrations/20260923170000-add-product-classification.js`. Run this
migration with the project's Sequelize migration runner before deploying
against an existing database; fresh environments are provisioned by the
model sync during startup. It adds `tipo_corte`, `origen`, `organica`,
`barbacua`, `saborizada`, and `sabor`.

### **Componentes Principales** 🔑

- 🏠 **HomeComponent**: Página principal con los productos en oferta.
- 📋 **YerbaListadoComponent**: Muestra la lista de productos de yerba.
- 📦 **YerbaDetalleComponent**: Muestra los detalles de un producto específico.
- 🛒 **YerbaCarritoComponent**: Gestiona el carrito de compras.
- ✅ **YerbaComprarComponent**: Finaliza la compra del carrito.
- 🧑‍🏫 **ConsejosComponent**: Muestra consejos sobre yerba y su preparación.

---

### **Servicios** 💻

- 🔹 **YerbaDatoService**: Servicio para obtener los productos desde la API.
- 🔸 **YerbaCarritoService**: Servicio para manejar el carrito de compras.

---

### **Manejo de Estado** 💡

- Utiliza **BehaviorSubject** de RxJS para manejar el estado de la lista de productos y la cantidad total del carrito en tiempo real.

---

## 🌍 **Rutas** 🛣️

- **/home**: Página de inicio con productos en oferta.
- **/listado**: Página con todos los productos disponibles.
- **/detalle/:id**: Página con los detalles de un producto específico.
- **/carrito**: Página para ver el carrito de compras.
- **/comprar**: Página para confirmar la compra.

---

## 🤝 **Contribuciones** 🙌

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. 🍴 Haz un **fork** del repositorio.
2. 🌱 Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. ✏️ Realiza tus cambios.
4. 💾 Haz un **commit** de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`).
5. 📤 **Sube** tus cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
6. 📝 Crea un **Pull Request**.

---

## 📝 **Licencia** 📄

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 💬 **Contacta con nosotros** 📧

Si tienes alguna duda o sugerencia, no dudes en [contactarnos](mailto:soporte@yerbashop.com). ¡Estamos aquí para ayudarte! 😊
