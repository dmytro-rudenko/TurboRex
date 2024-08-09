const { Server } = require("socket.io");

class TurboRexServer {
  io;
  storage = {};
  constructor(port) {
    this.io = new Server(port)
  }

  defineQueries(list) {
    this.io.on("connection", (socket) => {
      console.log("a user connected");
      list.forEach(({ query, handler }) => {
        socket.on(query, handler(socket));
        // socket.emit(query, rex.storage);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  add(query, handler) {
    return {
      query,
      handler: (socket) => (data) => {
        const res = handler(data)

        socket.emit(query, res)
      }
    }
  }
}

module.exports = TurboRexServer