'use strict'
const Seender = use('App/Models/Seender')
const User = use ('App/Models/User')

class SeenderController {
    async notisender({auth, response}){
        const user = auth.current.user

        const getseender = await Seender.query()
        .where('receptor_id', user.id)
        .whereNot('user_id', user.id)
        .where('is_readed',false)
        .count('* as total')

         const total = getseender[0].total   
  
        return response.json({
            status: 'success',
            data: total
        })
  
      }
      async newmensaje({request, auth, response}){

        const  user = auth.current.user
        const data = request.only(['conversation_id','mensaje','regalo','receptor_id']);
  
        const mensaje = new Seender();
          mensaje.user_id = user.id;
          mensaje.conversation_id = data.conversation_id;
          mensaje.receptor_id = data.receptor_id
          mensaje.mensaje = data.mensaje;
          mensaje.regalo = data.regalo  
          await mensaje.save();
  
          if(data.regalo !== 0 && user.puntos >= data.regalo){
            
            const puntos = parseInt(data.regalo , 10);

            const emisor = await User.findBy('id', user.id)
            emisor.puntos = emisor.puntos - puntos
            await emisor.save()
  
            const receptor = await User.findBy('id', data.receptor_id)
            
            receptor.puntos = receptor.puntos + puntos
            await receptor.save()
  
          }
  
          
          return response.status(201).json(mensaje);
  
  
      }

      async show({params, response}){

        const seenders = await Seender.query()
        .where('conversation_id', params.id)
        .with('user')
        .fetch()
      
        return response.json({
            status: 'success',
            data: seenders
          })}

          async readed({auth, response, params}){

            const user = await auth.current.user;
            const noti = await Seender.query()
                        .where('conversation_id', params.id)
                        .where('receptor_id', user.id)
                        .where('is_readed', false)
                        .update({ is_readed: true })
                  
            
            
            return response.status(200).json(noti)
          }
      
}

module.exports = SeenderController
