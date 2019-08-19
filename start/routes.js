'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

  Route.get('/', async()=>{
	  //Database first test
	  const Database = use('Database');
	  const x= await Database.select('*').from('users');
	  return x;
  });
  
  Route.post('/signup', 'UserController.signup');
  Route.post('/login', 'UserController.login');
  Route.post('/postgoal', 'GoalController.newgoal')


  Route.group(() => {
    Route.get('/me', 'UserController.me')
    Route.put('/update_profile', 'UserController.updateProfile');
    Route.put('/change_password', 'UserController.changePassword');
    Route.post('/updateProfilePic', 'UserController.updateProfilePic');
    Route.put('/updateportada', 'UserController.updateportada');
    Route.post('/primerlogro', 'UserController.asignarlogro')
    //Usuario
    Route.get(':username', 'UserController.showProfile');
    
})
    .prefix('account')
    .middleware(['auth'])

    Route.group(() => {
      Route.get('/users_to_follow', 'UserController.usersToFollow');
      Route.post ( '/follow' , 'UserController.follow' );
      Route.delete('/unfollow/:id', 'UserController.unFollow');
      Route.get('/timeline', 'UserController.timeline')
  })
      .prefix('users')
      .middleware(['auth']);

      //posts
      Route.post('/post', 'PostController.post').middleware(['auth']);
      Route.get('/posts/:id', 'PostController.show').middleware(['auth']);
      Route.post('/posts/reply/:id', 'PostController.reply').middleware(['auth']);


      //favoritos
      Route.group(() => {
        Route.post('/create', 'FavoriteController.favorite')
        Route.delete('/destroy/:id', 'FavoriteController.unFavorite');
    })
        .prefix('favorites')
        .middleware(['auth'])

      //Notificaciones
      Route.group(() => {
        Route.post('/newnoti/:id', 'NotificationController.newnotification');
        Route.get('/getnoti', 'NotificationController.shownotification')
        Route.get('/getnotiview', 'NotificationController.shownotificationreader')
    })
        .prefix('notif')
        .middleware(['auth']);

        //Eliminar Post
      
        Route.delete('/posts/destroy/:id', 'PostController.destroy').middleware(['auth'])
