'use strict'
const Seender = use('App/Models/Seender')
const User = use ('App/Models/User')

class SeenderController {
    async notisending({auth, response}){
        const user = auth.current.user

        const getseender = await Seender.query()
        .where('receptor_id', user.id)
        .where('is_readed',false)
        .fetch()
  
        return response.json({
            status: 'success',
            data: getseender
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

      async show({auth,params}){

        const seenders = await Sender.query()
        .where('conversation_id', params.id)
        .with('user')
        .fetch()
      
        return response.json({
            status: 'success',
            data: seenders
          })}
      
}

module.exports = SeenderController
