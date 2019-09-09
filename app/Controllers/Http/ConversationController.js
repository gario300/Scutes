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

        const me = auth.current.user
        
        const conversations  = await Conversation.query()
        .select('user1.username AS Emisor', 
        'user2.username AS Receptor',
        'user1.avatar AS Emisoravatar',
        'user2.avatar AS Receptoravatar',
        'user1.id AS Emisorid',
        'user2.id AS Receptorid',
        'conversations.id'
        )
        .join('users as user1', 'conversations.from_user_id', '=', 'user1.id')
        .join('users as user2', 'conversations.to_user_id', '=', 'user2.id')
        .where(function () {
          this.orWhere('from_user_id', me.id)
          this.orWhere('to_user_id', me.id )
        })
        .with('seenders')
        .fetch()
        

        return response.json({
            status: 'success',
            data: conversations
      })
    }
    async getconversationbyid({params, response, auth}){

      const conversation  = await Conversation.query()
      .select('user1.username AS Emisor', 
        'user2.username AS Receptor',
        'user1.id AS Emisorid',
        'user2.id AS Receptorid',
        'conversations.id'
        )
        .join('users as user1', 'conversations.from_user_id', '=', 'user1.id')
        .join('users as user2', 'conversations.to_user_id', '=', 'user2.id')
        .where('conversations.id', params.id)
        .fetch()

        const seenders = await Sender.query()
        .where('conversation_id', params.id)
        .with('user')
        .fetch()

        return response.json({
          status: 'success',
          data: conversation, seenders
        })
      
    }

    async newmensaje({request, auth, response}){

      const  user = auth.current.user
      const data = request.only(['conversation_id','mensaje','regalo','receptor_id']);

      const mensaje = new Sender();
        mensaje.user_id = user.id;
        mensaje.conversation_id = data.conversation_id;
        mensaje.receptor_id = data.receptor_id
        mensaje.mensaje = data.mensaje;
        mensaje.regalo = data.regalo    
        await mensaje.save();

        if(data.regalo !== 0 && user.puntos >= data.regalo){
          const emisor = await User.findBy('id', user.id)
          emisor.puntos = emisor.puntos - data.regalo
          await emisor.save()

          const receptor = await User.findBy('id', data.receptor_id)
          
          receptor.puntos = receptor.puntos + data.regalo
          await receptor.save()

        }

        
        return response.status(201).json(mensaje);


    }
    async notisender({auth, response}){
      const user = auth.current.user


    try{
      const seenders = await Sender.query()
      .where('receptor_id', user.id)
      .where('is_readed', false)
      .whereNot('user_id', user.id)
      .fetch()

      return response.json({
        status: 'success',
        data: seenders
      })
    }catch (error) {
      return console.log(error)
    }

    }
    
}

module.exports = ConversationController
