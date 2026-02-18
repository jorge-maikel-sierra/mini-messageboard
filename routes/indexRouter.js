const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

// GET / - Lista de mensajes
router.get("/", messagesController.indexGet);

// GET /new - Formulario para nuevo mensaje
router.get("/new", messagesController.newGet);

// POST /new - Crear nuevo mensaje (con validación)
router.post("/new", messagesController.newPost);

// GET /search - Buscar mensajes
router.get("/search", messagesController.searchGet);

// GET /messages/:id - Detalle de un mensaje
router.get("/messages/:id", messagesController.messageGet);

module.exports = router;

