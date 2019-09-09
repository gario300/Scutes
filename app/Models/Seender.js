'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Seender extends Model {
    conversation(){
        return this.belongsTo('App/Models/Conversation')
        }
    user(){
        return this.hasOne('App/Models/User')
    }
}

module.exports = Seender
