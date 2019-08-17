'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sender extends Model {
    receptor(){
        return this.hasOne('App/Models/Receptor')
}
}
module.exports = Sender
