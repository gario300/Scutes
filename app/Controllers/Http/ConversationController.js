'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['receptor_id']);
        
        const conversation = await Conversation.findOrCreate(
            { userone: seender.id, usertwo: data.receptor_id },
            { userone: seender.id, usertwo: data.receptor_id }
          )
          
          return response.json({
            status: 'success',
            data: conversation
        })
        
    } 

    
}

module.exports = ConversationController
