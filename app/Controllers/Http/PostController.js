'use strict'
const Post = use('App/Models/Post')
const Reply = use('App/Models/Reply')

class PostController {
    async post ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // Save tweet to database
        const post = await  Post.create({
            user_id: user.id,
            post: request.input('post'),
            postImage: postImage
            
        })
    
        // fetch tweet's relations
        await tweet.loadMany(['user', 'favorites', 'replies'])
    
        return response.json({
            status: 'success',
            message: 'Posteado!',
            data: post
        })
    }
    async show ({ params, response }) {
        try {
            const post = await Post.query()
                .where('id', params.id)
                .with('user')
                .with('replies')
                .with('replies.user')
                .with('favorites')
                .firstOrFail()
    
            return response.json({
                status: 'success',
                data: tweet
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'No encontrado'
            })
        }
    }

    //reply
    async reply ({ request, auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get tweet with the specified ID
        const post = await Post.find(params.id)
    
        // persist to database
        const reply = await Reply.create({
            user_id: user.id,
            post_id: post.id,
            reply: request.input('reply')
        })
    
        // fetch user that made the reply
        await reply.load('user')
    
        return response.json({
            status: 'success',
            message: 'Respuesta publicada',
            data: reply
        })
    }
    async destroy ({ request, auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get tweet with the specified ID
        const post = await Post.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()
    
        await tweet.delete()
    
        return response.json({
            status: 'success',
            message: 'Post Eliminado!',
            data: null
        })
    }

}

module.exports = PostController
