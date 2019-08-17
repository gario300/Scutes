'use strict'
const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')

class NotificationController {
    async newnotification ({ request, auth, params}) {

        const user = auth.current.user;
        const post = await Post.query()
                    .where('id', params.id)
                    .with('user')
                    .firstOrFail();
        
        
        const noti = new Notification();
        noti.user_id = user.id;
        noti.sender_id = post.user.username;
        noti.post_id = post.id;
        await noti.save();

    }
    

    
}

module.exports = NotificationController
