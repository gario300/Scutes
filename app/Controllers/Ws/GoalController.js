'use strict'

class GoalController {

  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage (message) {
    socket.emit('message', 'Hello world')
  }
  

}

module.exports = GoalController
