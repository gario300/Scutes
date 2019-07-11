'use strict'
const Favorite = use('App/Models/Favorite')

class FavoriteController {
    
    async favorite ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        const PostId = request.input('post_id')
    
        const favorite = await Favorite.findOrCreate(
            { user_id: user.id, post_id: PostId },
            { user_id: user.id, post_id: PostId }
        )
    
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
    
        return response.json({
            status: 'success',
            data: null
        })
    }

}

module.exports = FavoriteController
