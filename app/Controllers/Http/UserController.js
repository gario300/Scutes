'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const Post = use('App/Models/Post')
const Cloudinary = use('Cloudinary')

class UserController {

    ///Sign up
    async signup ({ request, auth, response }) {
		// get user data from signup form
		const userData = request.only(['name', 'username', 'email', 'password']);
		//console.log(userData);
		try {
            // save user to database
            const user = await new User()
            user.name = userData.name
            user.username = userData.username.replace(/ /g, "_")
            user.email = userData.email
            user.password = userData.password
            await user.save();
			// generate JWT token for user
			console.log("Creating token");
			const token = await auth.generate(user)
            console.log("Success");
            
            
			return response.json({
				status: 'success',
				data: token
			})
		} catch (error) {
			console.log(error);
			return response.status(400).json({
				status: 'error',
				message: 'Usuario y/o Email existentes'
			})
		}
	}

    ////Login
    async login ({ request, auth, response }) {
        try {
            // validate the user credentials and generate a JWT token
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )

            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            console.log(error)
            response.status(400).json({
                status: 'error',
                message: 'Contraseña o E-mail incorrecto'
            })
        }
    }


    //Metodo "me"
    async me ({ auth, response }) {
        const user = await User.query()
            .where('id', auth.current.user.id)
            .with('following')
            .with('followers')
            .with('favorites')
            .with('favorites.post', builder => {
                builder.with('user')
                builder.with('favorites')
                builder.with('replies')
            })
            .firstOrFail()

            

        return response.json({
            status: 'success',
            data: user
        })

    }

    async changePassword ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user

        // verify if current password matches
        const verifyPassword = await Hash.verify(
            request.input('password'),
            user.password
        )

        // display appropriate message
        if (!verifyPassword) {
            return response.status(400).json({
                status: 'error',
                message: 'No fue posible verificar la contraseña, intentalo de nuevo'
            })
        }

        // hash and save new password
        user.password = await Hash.make(request.input('newPassword'))
        await user.save()

        return response.json({
            status: 'success',
            message: 'Contraseña actualizada'
        })
    }
    async showProfile ({ request, params, response }) {
        try {
            const user = await User.query()
                .where('username', params.username)
                .with('posts', builder => {
                    builder.with('user')
                    builder.with('favorites')
                    builder.with('replies')
                })
                .with('goals')
                .with('following', builder => {
                    builder.with('followers')
                    builder.with('following')
                })
                .with('followers', builder => {
                    builder.with('followers')
                    builder.with('following')
                })
                .with('favorites')
                .with('favorites.post', builder => {
                    builder.with('user')
                    builder.with('favorites')
                    builder.with('replies')
                })
                .firstOrFail()

            return response.json({
                status: 'success',
                data: user
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            })
        }
    }

    async usersToFollow ({ params, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user

        // get the IDs of users the currently authenticated user is already following
        const usersAlreadyFollowing = await user.following().ids()

        // fetch users the currently authenticated user is not already following
        const usersToFollow = await User.query()
            .whereNot('id', user.id)
            .whereNotIn('id', usersAlreadyFollowing)
            .pick(3)

        return response.json({
            status: 'success',
            data: usersToFollow
        })
    }

    async follow ({ request, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user

        // add to user's followers
        await user.following().attach(request.input('user_id'))

        return response.json({
            status: 'success',
            data: null
        })
    }
    async unFollow ({ params, auth, response }) {
        // get currently authenticated user
        const user = auth.current.user

        // remove from user's followers
        await user.following().detach(params.id)

        return response.json({
            status: 'success',
            data: null
        })
    }
    async timeline ({params, response }) {
    
        const posts = await Post.query()
          .with('user')
          .with('favorites')
          .with('replies')
          .orderBy('created_at', 'DESC')
          .paginate(params.page, 8)
    
        return response.json({
          status: 'success',
          data: posts
        
        })
      }

    //foto de perfil
    async updateProfilePic({ request, auth, response }) {
        const user = auth.current.user
        const userData = request.only(['avatar']);
        
        if(user.avatar !== 'https://res.cloudinary.com/scute/image/upload/v1566358443/recursos/default_hduxaa.png'){
        
        const image = user.avatarpublicid
        Cloudinary.v2.uploader.destroy(image)

        }
        const avatar = userData['avatar'];
        const resultado = await Cloudinary.v2.uploader.upload(avatar);

        user.avatar = resultado.secure_url
        user.avatarpublicid = resultado.public_id
        await user.save()

        return response.json({
            status: 'success',
            data: user
        }) 
    }
    
    async updateProfile({auth, request, response}){
        const user = auth.current.user
        const userData = request.only(['bio','edad','location']);

        user.bio = userData.bio
        user.edad = userData.edad
        user.location =  userData.location
        await user.save()
        
        return response.json({
            status: 'success',
            data: user
        }) 

    }

    async especial({ request, response, params}){
        const data = request.only(['puntos','user']);
        
        const user = await User.findBy('username', data.user)
        
        const prueba = parseInt(data.puntos , 10);

        user.puntos = prueba
        await user.save()
        
        return response.json({
            status: 'success',
            data: user
        }) 

    }


    //foto de portada
    async updateportada ({ request, auth, response }){
        // get currently authenticated user
        const dataportada = request.only(['portada']);
        //console.log(userData);
        let portada = dataportada['portada'];//request.file('avatar', { types: ['image'], size: '2mb' })
        console.log("Uploading pic");
        const resultado =  await Cloudinary.v2.uploader.upload(portada);
        
        const user = auth.current.user
        user.portada = resultado.secure_url
        await user.save()
    }

    async royale ({response}) {
        try{
           const positions = await User.query()
           .where('id', '>' ,1)
           .limit(20)
           .orderBy('puntos', 'DESC')
           .fetch()
       
           return response.json({
               status: 'success',
               data: positions
           })
       } catch (error){
        response.status(404).json({
            status: 'error',
            message: 'El controlador funciona'
    
        })
       }
    }

 async userfind({params, response, auth}){
     const user = auth.current.user
     try{
     const userfind = await User.query() 
     .where('username', params.username)
     .whereNot('username', user.username)  
     .with('following')
     .with('followers')
     .limit(20)
     .fetch()
     
     return response.json({
        status: 'success',
        data: userfind
    })
} catch (error) {
    
    return response.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
    })
}
 }

async nerfeos({response}){

    const user = await User.query() 
    .where('id', '>', 1 )
    .update({ puntos: 0 })

    return response.status(200).json('success')
}

 


}

module.exports = UserController
