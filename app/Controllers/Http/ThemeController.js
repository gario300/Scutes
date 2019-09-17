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
        const fondo =  await Cloudinary.v2.uploader.upload(background);
    }
}

module.exports = ThemeController
