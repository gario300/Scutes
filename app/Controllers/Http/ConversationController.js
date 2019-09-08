'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['from_user_id']);
        
        const conversation = await Conversation.findOrCreate(
            { from_user_id: data.from_user_id },
            
            { fom_user_id: seender.id, 
              from_user_id: data.receptor_id,
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
        .where('user_id', user.id)
        .with('users')
        .fetch()


        return response.json({
            status: 'success',
            data: conversations1
      })
    }

    
}

module.exports = ConversationController
