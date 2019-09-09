'use strict'
const Seender = use('App/Models/Seender')
const User = use ('App/Models/User')

class SeenderController {
    async notisending({auth, response}){
        const user = auth.current.user

        const getseender = await Seender.query()
        .where('receptor_id', user.id)
        .where('is_readed',false)
        .fetch()
  
        return response.json({
            status: 'success',
            data: getseender
        })
  
      }
}

module.exports = SeenderController
