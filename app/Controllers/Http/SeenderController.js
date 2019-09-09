'use strict'
const Sender = use('App/Models/Seender')

class SeenderController {
    async notisender({auth, response}){
        const user = auth.current.user
  
  
      try{
        const seenders = await Sender.query()
        .where('receptor_id', user.id)
        .where('is_readed', false)
        .whereNot('user_id', user.id)
        .with('user')
        .fetch()
  
        return response.json({
          status: 'success',
          data: seenders
        })
      }catch (error) {
        console.log(error)
      }
  
      }
}

module.exports = SeenderController
