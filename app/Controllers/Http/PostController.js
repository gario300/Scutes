'use strict'
const Post = use('App/Models/Post')
const Reply = use('App/Models/Reply')
const Cloudinary = use('Cloudinary')

class PostController {
    async post ({ request, auth, response }) {
        const user = auth.current.user
        // get currently authenticated user
        const postData = request.only(['user_id','post','image']);
        //console.log(userData);
        
        if (postData.image !== null && postData.post !== null ){
            let postPic = postData['image'];//request.file('avatar', { types: ['image'], size: '2mb' })
        console.log("Uploading pic");
            
        
        const resultado =  await Cloudinary.v2.uploader.upload(postPic);
        
        
        const post = new Post();
        post.user_id = postData.user_id;
        post.post = postData.post;
        post.image = resultado.secure_url;
        post.imagepublicid = resultado.public_id;     
        await post.save();
        await post.loadMany(['user', 'favorites', 'replies'])
        
        return response.status(201).json(post);
        
             

        } else {
        const post = new Post();
        post.user_id = postData.user_id;
        post.post = postData.post;
        post.image = NULL;
        await post.save();
        await post.loadMany(['user', 'favorites', 'replies']) 
        return response.status(201).json(post);
        }
        
        
        //await request.user.save()
       // fetch tweet's relations
       
    
        
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
                data: post
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

        const image = post.imagepublicid

            if(post.image !== null) {
                Cloudinary.v2.uploader.destroy(image)
                    
            }
    
        await post.delete()

        
    
        return response.json({
            status: 'success',
            message: 'Post Eliminado!',
            data: null
        })
    }

}

module.exports = PostController
