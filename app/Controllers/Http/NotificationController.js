'use strict'
const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')
const User = use ('App/Models/User')

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
    async notifollow({ request, auth}) {
        const data = request.only(['notification_type','receptor_id']);

        const user = auth.current.user;
        
        const noti = new Notification();
        noti.user_id = user.id; 
        noti.receptor_id = data.receptor_id
        noti.notification_type = data.notification_type;
        await noti.save();
        await noti.loadMany(['user'])

    }

    async shownotification ({auth , response, request}){
        const page = request.only(['foo']);

        const user = auth.current.user
        try {
            const noti = await Notification.query()
                .where('receptor_id', user.id) 
                .whereNot('user_id', user.id)
                .with('user')
                .with('post')
                .orderBy('created_at', 'DESC')
                .paginate(page, 8)
    
            return response.json({
                status: 'success',
                data: noti
            })
    
    }catch (error) {
        return console.log(error)
    }
}

async shownotificationreader ({auth , response}){
        
    const user = auth.current.user
    try {
        const noti = await Notification.query()
            .where('receptor_id', user.id)
            .whereNot('user_id', user.id)
            .where('is_readed', false)
            .count('* as total')

         const total = noti[0].total   

        return response.json({
            status: 'success',
            data: total
        })

}catch (error) {
    return console.log(error)
}
}

async putnoti ({ auth, response}) {

    const user = await auth.current.user;
    const noti = await Notification.query()
                .where('receptor_id', user.id)
                .where('is_readed', false)
                .update({ is_readed: true })
        
    
    
    return response.status(200).json(noti)
    

}
    

    
}

module.exports = NotificationController
