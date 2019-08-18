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
            const noti = await Notification.findByOrFail('receptor_id', user.id )
                .with('user')
                .with('post')
                .orderBy('created_at', 'DESC')
    
            return response.json({
                status: 'success',
                data: noti
            })
    
    }catch (error) {
        return console.log(error)
    }
}
    

    
}

module.exports = NotificationController
