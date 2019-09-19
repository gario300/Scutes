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
  
  Route.put('/nerfeo', 'UserController.nerfeos')
  Route.get('/royal', 'UserController.royale')
  Route.post('/signup', 'UserController.signup');
  Route.post('/login', 'UserController.login');
  Route.post('/postgoal', 'GoalController.newgoal')


  Route.group(() =>{
    Route.post('/new', 'ThemeController.newtheme' )
    Route.get('/get/:page', 'ThemeController.mistemas')
    Route.post('/change', 'ThemeController.definirtema' )
    Route.get('/currentheme', 'ThemeController.temaactual')

  })
    .prefix('theme')
    .middleware(['auth'])

  Route.group(() => {
    Route.get('/me', 'UserController.me')
    Route.put('/update_profile', 'UserController.updateProfile');
    Route.put('/change_password', 'UserController.changePassword');
    Route.put('/updateProfilePic', 'UserController.updateProfilePic');
    Route.put('/updateportada', 'UserController.updateportada');
    Route.post('/goals', 'GoalController.allgoals')
    Route.get('/getgoal', 'GoalController.getgoals')
    Route.put('/readgoal/:id', 'GoalController.updategoal')
    //Usuario
    Route.get(':username', 'UserController.showProfile');
    //buscador
    Route.get('/finder/:username', 'UserController.userfind');
    Route.put('/especial', 'UserController.especial');
    
})
    .prefix('account')
    .middleware(['auth'])

    Route.group(() =>{
      Route.post('/sendmensage', 'ConversationController.newconversation')
      Route.post('/newsend', 'SeenderController.newmensaje')
      Route.get('timline/:id','SeenderController.show')
      Route.get('/conversations', 'ConversationController.getconversation')
      Route.get(':id', 'ConversationController.getconversationbyid')
      Route.put('/isreaded/:id', 'SeenderController.readed')
    })
    .prefix('mensajeria')
    .middleware(['auth']);

    Route.group(() => {
      Route.get('/users_to_follow', 'UserController.usersToFollow');
      Route.post ( '/follow' , 'UserController.follow' );
      Route.delete('/unfollow/:id', 'UserController.unFollow');
      Route.get('/timeline/:page', 'UserController.timeline')
  })
      .prefix('users')
      .middleware(['auth']);

      //posts
      Route.post('/post', 'PostController.post').middleware(['auth']);
      Route.get('/posts/:id', 'PostController.show').middleware(['auth']);
      Route.post('/posts/reply/:id', 'PostController.reply').middleware(['auth']);
      Route.get('/destacado', 'PostController.favorites').middleware(['auth']);
      Route.get('/usertimeline/:page', 'PostController.usertimeline').middleware(['auth'] )


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
        Route.post('/newnoti', 'NotificationController.notifollow' )
        Route.get('/getnoti', 'NotificationController.shownotification')
        Route.get('/notisending','SeenderController.notisender')
        Route.get('/getnotiview', 'NotificationController.shownotificationreader')
        Route.put('/notiview', 'NotificationController.putnoti')
    })
        .prefix('notif')
        .middleware(['auth']);

        //Eliminar Post
      
        Route.delete('/posts/destroy/:id', 'PostController.destroy').middleware(['auth'])
