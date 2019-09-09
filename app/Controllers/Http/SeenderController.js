'use strict'
const Seender = use('App/Models/Seender')

class SeenderController {
    async notisender({auth, response}){
        
        const seender = await Seender.query()
        .where('reeptor_id', params.id)
        .fetch()
  

  
      }
}

module.exports = SeenderController
