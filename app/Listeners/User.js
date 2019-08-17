'use strict'
const Notification = use('App/Models/Notification')

const User = exports = module.exports = {}

User.newreply = async () => {
        
        const noti = new Notification();
              noti.user_id = user_id;
              noti.sender_id = sender_id;
              noti.reply_id = reply_id;    
              await noti.save();
 
    
}
