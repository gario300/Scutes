'use strict'
const Seender = use('App/Models/Seender')

class SeenderController {
    async notisender({auth, response,params}){
        
        const seender = await Seender.query()
        .where('receptor_id', params.id)
        .fetch()
  

  
      }
}

module.exports = SeenderController
