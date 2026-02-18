// controllers/messagesController.js
const { body, validationResult, matchedData } = require("express-validator");
const messagesStorage = require("../storages/messagesStorage");

// ─── Reglas de validación reutilizables ───────────────────────────────────────
const validateMessage = [
  body("messageUser")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío.")
    .isLength({ max: 30 })
    .withMessage("El nombre no puede superar los 30 caracteres.")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo puede contener letras."),

  body("messageText")
    .trim()
    .notEmpty()
    .withMessage("El mensaje no puede estar vacío.")
    .isLength({ max: 200 })
    .withMessage("El mensaje no puede superar los 200 caracteres."),
];

// ─── GET / ────────────────────────────────────────────────────────────────────
exports.indexGet = (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messagesStorage.getMessages(),
  });
};

// ─── GET /new ─────────────────────────────────────────────────────────────────
exports.newGet = (req, res) => {
  res.render("form", {
    title: "Nuevo Mensaje",
  });
};

// ─── POST /new ────────────────────────────────────────────────────────────────
exports.newPost = [
  validateMessage,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Repoblar el formulario con los valores enviados y mostrar errores
      return res.status(400).render("form", {
        title: "Nuevo Mensaje",
        errors: errors.array(),
        data: req.body,
      });
    }

    // matchedData garantiza que obtenemos los datos ya sanitizados (ej: trimmed)
    const { messageUser, messageText } = matchedData(req);
    messagesStorage.addMessage({ user: messageUser, text: messageText });
    res.redirect("/");
  },
];

// ─── GET /messages/:id ────────────────────────────────────────────────────────
exports.messageGet = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const message = messagesStorage.getMessage(id);

  if (!message) {
    return res.status(404).render("index", {
      title: "Mensaje no encontrado",
      messages: messagesStorage.getMessages(),
      errors: [{ msg: `No existe ningún mensaje con el ID ${id}.` }],
    });
  }

  res.render("message", {
    title: "Detalle del Mensaje",
    message,
    id,
  });
};

// ─── GET /search ──────────────────────────────────────────────────────────────
exports.searchGet = (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  let results = [];

  if (q) {
    results = messagesStorage
      .getMessages()
      .filter(
        (m) =>
          m.user.toLowerCase().includes(q) ||
          m.text.toLowerCase().includes(q)
      );
  }

  res.render("search", {
    title: "Resultados de búsqueda",
    q: req.query.q || "",
    results,
  });
};
