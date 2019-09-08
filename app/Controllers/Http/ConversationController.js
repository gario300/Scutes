'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['to_user_id']);
        
        const conversation = await Conversation.findOrCreate(
            { to_user_id: data.to_user_id },
            
            { from_user_id: seender.id, 
              to_user_id: data.to_user_id,
            }
          )
          
          return response.json({
            status: 'success',
            data: conversation
        })
        
    } 

    async getconversation({auth, response}){

        const user = auth.current.user
        
        const conversations1  = await Conversation.query()  
        .where('to_user_id', user.id)
        .with('users')
        .fetch()


        return response.json({
            status: 'success',
            data: conversations1
      })
    }

    
}

module.exports = ConversationController
