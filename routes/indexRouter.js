const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// GET / - Lista de mensajes
router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
});

// GET /new - Formulario para nuevo mensaje
router.get("/new", (req, res) => {
  res.render("form", {
    title: "Nuevo Mensaje",
  });
});

// POST /new - Crear nuevo mensaje
router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;

  if (!messageUser || !messageText) {
    return res.status(400).send("El usuario y el texto del mensaje son requeridos.");
  }

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

// GET /messages/:id - Detalle de un mensaje
router.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id < 0 || id >= messages.length) {
    return res.status(404).render("index", {
      title: "Mensaje no encontrado",
      messages: [],
    });
  }

  const message = messages[id];

  res.render("message", {
    title: "Detalle del Mensaje",
    message: message,
    id: id,
  });
});

module.exports = router;
