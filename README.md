# 💬 Mini Messageboard

Una aplicación web sencilla de tablero de mensajes construida con **Node.js**, **Express 5** y **EJS**.

## 📋 Descripción

Mini Messageboard permite a los usuarios publicar mensajes y visualizarlos en una lista. Los mensajes se almacenan en memoria (array en el servidor), sin necesidad de base de datos.

## 🛠️ Tecnologías

| Tecnología | Versión |
|-----------|---------|
| Node.js   | >= 18   |
| Express   | ^5.2.1  |
| EJS       | ^4.0.1  |

## 📁 Estructura del proyecto

```
server/
│
├── app.js               # Punto de entrada, configuración de Express
├── package.json
├── routes/
│   └── indexRouter.js   # Todas las rutas de la aplicación
└── views/
    ├── index.ejs        # Lista de mensajes
    ├── form.ejs         # Formulario para nuevo mensaje
    └── message.ejs      # Detalle de un mensaje
```

## 🚀 Instalación y uso

### 1. Clona el repositorio

```bash
git clone <url-del-repositorio>
cd mini-messageboard/server
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Inicia el servidor

```bash
npm start
```

### 4. Abre el navegador

```
http://localhost:3000
```

## 🗺️ Rutas disponibles

| Método   | Ruta              | Descripción                                |
|----------|-------------------|--------------------------------------------|
| `GET`    | `/`               | Muestra la lista de todos los mensajes     |
| `GET`    | `/new`            | Formulario para crear un nuevo mensaje     |
| `POST`   | `/new`            | Recibe el formulario y crea el mensaje     |
| `GET`    | `/messages/:id`   | Muestra el detalle de un mensaje por índice|

## ⚙️ Funcionamiento

- Los mensajes se guardan en un **array en memoria** dentro de `indexRouter.js`.
- Al reiniciar el servidor los mensajes vuelven a los valores iniciales.
- Se incluyen dos mensajes de ejemplo al arrancar:
  - *"Hi there!"* — Amando
  - *"Hello World!"* — Charles

## 📝 Variables de entorno

No se requieren variables de entorno. El servidor corre por defecto en el **puerto 3000**.

## 📄 Licencia

ISC

