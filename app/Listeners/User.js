'use strict'
const Notification = use('App/Models/Notification')

const User = exports = module.exports = {}

User.newreply = async (data) => {
        
        const noti = new Notification();
              noti.user_id = data.user_id;
              noti.sender_id = data.sender_id;
              noti.reply_id = data.reply_id;    
              await noti.save();
 
    
}
