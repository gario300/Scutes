const Event = use('Event')
const Notification = use('App/Models/Notification')

Event.on('new::reply',async (reply) => {
  const notiData = request.only(['user_id','sender_id','reply_id']);
  const noti = new Notification();
        noti.user_id = user_id;
        noti.sender_id = sender_id;
        noti.reply_id = reply_id;    
        await noti.save();
    
  })