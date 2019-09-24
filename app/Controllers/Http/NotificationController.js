'use strict'
const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')
const User = use ('App/Models/User')
const Theme = use ('App/Models/Theme')

class NotificationController {
    async newnotification ({ request, auth}) {
        const data = request.only(['notification_type', 'themeid','postid','creadorname']);

        const user = auth.current.user;
        
        if (data.themeid == null){
        const post = await Post.query()
                    .where('id', data.postid)
                    .with('user')
                    .firstOrFail(); 
        
        const noti = new Notification();
        noti.user_id = user.id; 
        noti.receptor_id = post.user_id
        noti.post_id = post.id;
        noti.notification_type = data.notification_type;
        await noti.save();
        await noti.loadMany(['user','post'])
        } else{
            const theme = await Theme.query()
            .where('id', data.themeidid)
            .with('user')
            .firstOrFail(); 

            const noti = new Notification();
            noti.user_id = user.id; 
            noti.creador = data.creador
            noti.theme_id = theme.id;
            noti.notification_type = data.notification_type;
            await noti.save();
            await noti.loadMany(['user','theme'])

        } 

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
        const data = request.only(['foo']);
        const page = parseInt(data.foo , 10);

        const user = auth.current.user
        try {
            const noti = await Notification.query()
                .where('receptor_id', user.id)
                .orWhere('receptor_name',user.username)
                .whereNot('user_id', user.id)
                .whereNot('receptor_id', null)
                .with('user')
                .with('post')
                .with('theme')
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
    const name = user.username
    try {
        const noti = await Notification.query()
            .where(function () {
                this.orWhere('receptor_id', user.id)
                this.orWhere('receptor_name', name )
            })
            .whereNot('user_id', user.id)
            .whereNot('is_readed', true)
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
