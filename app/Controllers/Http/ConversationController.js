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
        .select('users1.name AS Emisor', 'users2.name AS Receptor') 
        .join('users as user1', 'conversations.from_user_id', '=', 'user1.id')
        .join('users as user2', 'conversations.to_user_id', '=', 'user2.id') 
        .where('from_user_id', user.id)
        .fetch()


        return response.json({
            status: 'success',
            data: conversations1
      })
    }

    
}

module.exports = ConversationController
