'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['receptor_id']);
        
        const conversation = await Conversation.findOrCreate(
            { usertwo: data.receptor_id },
            { userone: seender.id, usertwo: data.receptor_id }
          )
          
          return response.json({
            status: 'success',
            data: conversation
        })
        
    } 

    async getconversation({auth, response}){

        const user = auth.current.user
        
        const conversations1  = await Conversation.query()  
        .where('userone', user.id)
        .with('users')
        .fetch()
        
        const conversations2 = await Conversation.query()
        .where('usertwo', user.id)
        .with('users')
        .with('conversation.users')
        .fetch()

        return response.json({
            status: 'success',
            data: conversations1, conversations2
      })
    }

    
}

module.exports = ConversationController
