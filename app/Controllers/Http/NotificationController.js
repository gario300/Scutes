'use strict'
const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')

class NotificationController {
    async newnotification ({ request, auth, params}) {
        const data = request.only(['notification_type']);

        const user = auth.current.user;
        const post = await Post.query()
                    .where('id', params.id)
                    .with('user')
                    .firstOrFail(); 
        
        const noti = new Notification();
        noti.user_id = user.id; 
        noti.receptor_id = post.user_id
        noti.post_id = post.id;
        noti.notification_type = data.notification_type;
        await noti.save();
        await noti.loadMany(['user','post'])

    }

    async shownotification ({auth , response}){
        
        const user = auth.current.user
        try {
            const notifications = await Notification.findByOrFail('receptor_id', user.id )
                .with('user')
                .with('post')
                .orderBy('created_at', 'DESC')
                .fetch()
    
            return response.json({
                status: 'success',
                data: notifications
            })
    
    }catch (error) {
        return response.status(404).json({
            status: 'error',
            message: 'No encontrado'
        })
    }
}
    

    
}

module.exports = NotificationController
