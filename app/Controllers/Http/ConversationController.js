'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['receptor_id', 'receptor_username']);
        
        const conversation = await Conversation.findOrCreate(
            { receptor_id: data.receptor_id },
            
            { user_id: seender.id, 
              receptor_id: data.receptor_id,
              receptor_username: data.receptor_username
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
        .with('user')
        .fetch()
        
        const conversations2 = await Conversation.query()
        .where('receptor_id', user.id)
        .with('user')
        .fetch()

        const conversation3 = conversations1 + conversations2

        return response.json({
            status: 'success',
            data: conversation3
      })
    }

    
}

module.exports = ConversationController
