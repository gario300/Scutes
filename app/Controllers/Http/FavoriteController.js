'use strict'
const Favorite = use('App/Models/Favorite')
const Post = use('App/Models/Post')

class FavoriteController {
    
    async favorite ({ request, auth, response }) {
        // get currently authenticated user
        const PostId = await request.input('post_id')
        const post = await Post.findByOrFail('id', request.input('post_id'))
        
        const user = auth.current.user
        const user2 = await User.findByOrFail('id', post.user_id)
    
        const favorite = await Favorite.findOrCreate(
            { user_id: user.id, post_id: PostId },
            { user_id: user.id, post_id: PostId }
        )

        if(user.puntos >= 0){
            user.puntos = user.puntos - 10
            await user.save()

            user2.puntos = user2.puntos + 10
            await user2.save()
        }
        
        await post.contadorf ++
        await post.save()
    
        return response.json({
            status: 'success',
            data: favorite
        })
    }

    async unFavorite ({ params, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // fetch favorite

        await Favorite.query()
            .where('user_id', user.id)
            .where('post_id', params.id)
            .delete()

            
        const post = await Post.findByOrFail('id', params.id)  
         post.contadorf --
        await post.save()
        

            return response.json({
            status: 'success',
            data: null
        })
    }

}

module.exports = FavoriteController
