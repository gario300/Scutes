'use strict'

class GoalController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    
    console.log('A new subscription for room topic', socket.topic)
  }
}

module.exports = GoalController
