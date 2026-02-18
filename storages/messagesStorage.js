// storages/messagesStorage.js
// Simula una base de datos en memoria con el patrón Singleton.
class MessagesStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addMessage({ user, text }) {
    const id = this.id;
    this.storage[id] = { id, user, text, added: new Date() };
    this.id++;
  }

  getMessages() {
    return Object.values(this.storage);
  }

  getMessage(id) {
    return this.storage[id];
  }
}

// Exportamos una instancia única (singleton) con mensajes de ejemplo precargados
const messagesStorage = new MessagesStorage();
messagesStorage.addMessage({ user: "Amando", text: "Hi there!" });
messagesStorage.addMessage({ user: "Charles", text: "Hello World!" });

module.exports = messagesStorage;
