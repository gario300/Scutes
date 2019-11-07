'use strict'

class GoalController {

  constructor (params) {
    const { socket, request } = params
    this.socket = socket
    this.request = request

    console.log('A new subscription for room topic', socke.id)
  }
  

}

module.exports = GoalController
