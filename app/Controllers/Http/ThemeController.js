'use strict'
const Cloudinary = use('Cloudinary')
const Theme = use('App/Models/Theme')
const User = use('App/Models/User')
const Intertheme = use('App/Models/Intertheme')
const Currentheme = use('App/Models/Currentheme')

class ThemeController {
    async newtheme({auth, request, response}){
        const user = auth.current.user
        const data = request.only(['nombretema','estilonavbar','estiloiconos',
        'estilopagina','background','userbox','postbox','colortexto','moneda','precio']);

        if (user.puntos >= 100) {
        let background = data['background'];//request.file('avatar', { types: ['image'], size: '2mb' })
        console.log("Uploading pic");

        let userbox = data['userbox'];//request.file('avatar', { types: ['image'], size: '2mb' })
        console.log("Uploading pic");

        let postbox = data['postbox'];//request.file('avatar', { types: ['image'], size: '2mb' })
        console.log("Uploading pic");

        const fondo =  await Cloudinary.v2.uploader.upload(background,
            {folder: "themes"});

        const textbox =  await Cloudinary.v2.uploader.upload(userbox,
            { folder: "themes"});

        const cajapost =  await Cloudinary.v2.uploader.upload(postbox,
            { folder: "themes"} );

        const precio = parseInt(data.precio , 10);
            
        const theme = new Theme()
        theme.creador = user.username
        theme.nombretema = data.nombretema.replace(/ /g, "_")
        theme.estilonavbar = data.estilonavbar
        theme.estiloiconos = data.estiloiconos
        theme.estilopagina = data.estilopagina
        theme.background = fondo.secure_url
        theme.userbox = textbox.secure_url
        theme.postbox = cajapost.secure_url
        theme.colortexto = data.colortexto
        theme.moneda = data.moneda
        theme.precio = precio
        theme.secure1 = fondo.public_id
        theme.secure2 = textbox.public_id
        theme.secure3 = cajapost.public_id
        await theme.save();

        await user.themes().attach([theme.id])

        user.puntos = user.puntos - 100
        await user.save();
    
        return response.status(201).json(theme);
    } else {
        return response.json({
            status: 'no tienes suficientes puntos',
            data: null
          })

    }

    }
    async mistemas({auth, response, params}){
        const user = auth.current.user

        const theme = await Theme.query()
        .select('users.id AS tenertema',
        'theme.id AS id', 
        'theme.nombretema AS nombretema',
        'theme.creador AS creador',
        'theme.estilonavbar AS navbar',
        'theme.estiloiconos AS iconos',
        'theme.estilopagina AS pagina',
        'theme.background AS Fondo',
        'theme.userbox AS ubox',
        'theme.postbox AS pbox',
        'theme.colortexto AS texto',
        'theme.moneda AS pay',
        'theme.precio AS price',
        'theme.created_at AS created'
        )
        .from('users')
        .leftJoin('interthemes as IT', 'IT.user_id', '=', 'users.id')
        .leftJoin('themes as theme', 'IT.theme_id', '=', 'theme.id')
        .whereNot('theme_id', null)
        .whereNot('user_id', null)
        .where('user_id',user.id)
        .orderBy('created', 'DESC')
        .paginate(params.page, 3)

        return response.json({
            status: 'success',
            data: theme
          })
        
    }
    async definirtema({auth,response,request}){
        
        const data = request.only(['temaid'])
        const theme = await Theme.findBy('id', data.temaid)
    
           let currentheme = new Currentheme()
            currentheme.user_id = auth.current.user.id
            currentheme.nombretema= theme.nombretema
            currentheme.estilonavbar = theme.estilonavbar
            currentheme.estiloiconos = theme.estiloiconos
            currentheme.estilopagina = theme.estilopagina
            currentheme.background = theme.background
            currentheme.userbox = theme.userbox
            currentheme.postbox = theme.postbox
            currentheme.colortexto = theme.colortexto
            await currentheme.save()

            return response.json({
                status: 'success',
                data: currentheme
              })



        }

        async current({auth,response}){
            
            const user = auth.current.user

            const theme = await Currentheme.findBy('user_id', user.id)

            return response.json({
                status: 'success',
                data: theme
              })

        }

        async quitarcurrentheme({auth, params, response}){
            
            const user = auth.current.user

            const current = await Currentheme.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()
            
            await current.delete()

            return response.json({
                status: 'success',
                message: 'Tema quitado',
                data: null
            })
        }
        async actualizartheme({auth, request, response}){
            const data = request.only(['temaid'])

            const user = auth.current.user

            const currentheme = await Currentheme.findBy('user_id', user.id)
            const theme = await Theme.findBy('id', data.temaid) 
            
            currentheme.user_id = user.id
            currentheme.nombretema= theme.nombretema
            currentheme.estilonavbar = theme.estilonavbar
            currentheme.estiloiconos = theme.estiloiconos
            currentheme.estilopagina = theme.estilopagina
            currentheme.background = theme.background
            currentheme.userbox = theme.userbox
            currentheme.postbox = theme.postbox
            currentheme.colortexto = theme.colortexto
            await currentheme.save()

            return response.json({
                status: 'success',
                data: currentheme
              })

        }

        async tienda({params , response}) {

                const store = await Theme.query()
                    .select('user.id AS tenertema',
                    'user.name AS name',
                    'theme.id AS id', 
                    'theme.nombretema AS nombretema',
                    'theme.creador AS creador',
                    'theme.estilonavbar AS navbar',
                    'theme.estiloiconos AS iconos',
                    'theme.estilopagina AS pagina',
                    'theme.background AS Fondo',
                    'theme.userbox AS ubox',
                    'theme.postbox AS pbox',
                    'theme.colortexto AS texto',
                    'theme.moneda AS pay',
                    'theme.precio AS price',
                    'theme.created_at AS created'
                    )
                    .join('users as user', 'interthemes.user_id', '=', 'user.id')
                    .join('themes as theme', 'interthemes.theme_id', '=', 'theme.id')
                    .orderBy('created', 'DESC')
                    .paginate(params.page, 3)
                    

          return response.json({
            status: 'success',
            data: store
        
          })
   
        }

        async comprarpuntos ({request, auth, response}){
            const data = request.only(['nombretema','nombrecreador'])

            const user1 = auth.current.user
            const user2 = await User.findBy('username', data.nombrecreador)

            const tema = await Theme.query()
            .select('users.id AS tenertema',
            'theme.id AS id', 
            'theme.nombretema AS nombretema',
            'theme.creador AS creador',
            'theme.estilonavbar AS navbar',
            'theme.estiloiconos AS iconos',
            'theme.estilopagina AS pagina',
            'theme.background AS Fondo',
            'theme.userbox AS ubox',
            'theme.postbox AS pbox',
            'theme.colortexto AS texto',
            'theme.moneda AS pay',
            'theme.precio AS price',
            'theme.created_at AS created'
            )
            .from('users')
            .leftJoin('interthemes as IT', 'IT.user_id', '=', 'users.id')
            .leftJoin('themes as theme', 'IT.theme_id', '=', 'theme.id')
            .whereNot('theme_id', null)
            .whereNot('user_id', null)
            .where('nombretema', data.nombretema)
            .firstOrFail()


            if (user1.puntos >= tema.price && user1 !== tema.tenertema){
                
                user2.puntos = user2.puntos + tema.price
                await user2.save()

                user1.puntos = user1.puntos - tema.price
                await user1.save()

                user1.themes().attach([tema.id])

                return response.json({
                    status: 'Comprado!',
                    data: null
                  
                  })

            } else {

                return response.json({
                    status: 'No tienes puntos suficiente',
                    data: null
                  
                  })
            }


        }
        



    }


module.exports = ThemeController
