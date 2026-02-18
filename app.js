const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", indexRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render("index", {
    title: "404 - Página no encontrada",
    messages: [],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal! Error interno del servidor.");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mini Messageboard corriendo en http://localhost:${PORT}`);
});
