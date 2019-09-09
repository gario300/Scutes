'use strict'
const Seender = use('App/Models/Seender')

class SeenderController {
    async notisender({auth, response}){
        return await Seender.all()
  

  
      }
}

module.exports = SeenderController
