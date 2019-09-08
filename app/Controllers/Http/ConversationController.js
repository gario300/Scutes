'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['receptor_id']);
        

        const conversation = new Conversation();
        conversation.userone = seender.id;
        conversation.usertwo = data.receptor_id;
        await conversation.save();
        await conversation.loadMany(['user'])
        
    } 

    
}

module.exports = ConversationController
