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


    }
    async mistemas({auth, response, params}){
        const user = auth.current.user

        const theme = await Intertheme.query()
        .where('user_id', user.id)
        .with('theme')
        .paginate(params.page, 8)

        return response.json({
            status: 'success',
            data: theme
          })
        
    }
    async definirtema({auth,response,request}){
        
        const data = request.only(['temaid'])
        const theme = await Theme.findBy('id', data.temaid)
    
        if(theme.moneda == 'puntos'){
           let currentheme = new Currentheme()
            currentheme.user_id = auth.current.user.id
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


        }



    }


module.exports = ThemeController
