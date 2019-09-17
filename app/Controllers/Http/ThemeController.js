'use strict'
const Cloudinary = use('Cloudinary')
const Theme = use('App/Models/Theme')

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
    async mistemas({auth, response}){
        const user = auth.current.user
        const temas = await User.query()
        .where('id', user.id)
        .with('temas')
        .firstOrFail()

        return response.json({
            status: 'success',
            data: temas
        })
        
    }
}

module.exports = ThemeController
