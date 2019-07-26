'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const Post = use('App/Models/Post')
const Cloudinary = use('Cloudinary')

class UserController {

    ///Sign up
    async signup ({ request, auth, response }) {
        // get user data from signup form
        console.log("Signin up boii");
		const userData = request.only(['name', 'username', 'email', 'password']);
		console.log(userData);
		try {
			// save user to database
			const user = await User.create(userData)
			// generate JWT token for user
			console.log("Creating token");
			const token = await auth.generate(user)
			console.log("Token " + token);
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
        .with('posts', builder => {
            builder.with('user')
            builder.with('favorite')
            builder.with('replie')
        })
        .with('following')
        .with('followers')
        .with('favorites')
        .with('favorites.posts', builder => {
            builder.with('users')
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
async timeline ({ auth, response }) {
    const user = await User.find(auth.current.user.id)

    // get an array of IDs of the user's followers
    const followersIds = await user.following().ids()

    // add the user's ID also to the array
    followersIds.push(user.id)

    const posts = await Post.query()
        .whereIn('user_id', followersIds)
        .with('user')
        .with('favorites')
        .with('replies')
        .fetch()

    return response.json({
        status: 'success',
        data: posts
    })
}

//foto de perfil
async updateProfilePic({ request, response }) {
    console.log("Getting pic");
    const userData = request.only(['avatar', 'id']);
    //console.log(userData);
    let profilePic = userData["avatar"];//request.file('avatar', { types: ['image'], size: '2mb' })
    let userId=userData['id'];
    console.log("Uploading pic");
    var cloudinaryMeta;
    await Cloudinary.v2.uploader.upload(profilePic, 
      function(error, result) {
        cloudinaryMeta=result;
        /*console.log("Cloudinary result:");
        console.log(result, error); */
    });
    //console.log(cloudinaryMeta);
    let picUrl = cloudinaryMeta['secure_url'];
    console.log("Saving pic url");
    const Database = use('Database');
    const affectedRows = yield Database
    .table('users')
    .where('id', userId)
    .update('avatar', picUrl);
    //await request.user.save()
    console.log("Done!");
    //return response.redirect('back');
    return response.json({
        status: 'success',
        data: null
    })
  }

}

module.exports = UserController
