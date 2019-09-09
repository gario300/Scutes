'use strict'
const Seender = use('App/Models/Seender')
const User = use ('App/Models/User')

class SeenderController {
    async notisender({auth, response}){
        const user = auth.current.user

        const getseender = await Seender.query()
        .where('conversation_id', 1)
        .fetch()
  
        return response.json({
            status: 'success',
            data: getseender
        })
  
      }
}

module.exports = SeenderController
