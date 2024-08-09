const { io } = require("socket.io-client");
const { observable } = require('mobx')

class TurboRexClient {
  socket
  state = observable({
    msg: ''
  })

  constructor(host, port) {
    this.socket = io(`${host}:${port}`);
  }

  delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  defineCalls(list) {
    this.socket.on("error", (err) => {});
    list.map((query) => {
      this.socket.on(query, (result) => {
        this.state.msg = result
      });
    })
  }

  async call(query, data, wait = 400) {
    this.socket.emit(query, data);
    await this.delay(wait)

    return this.state.msg
  }
}

module.exports = TurboRexClient