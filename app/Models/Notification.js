'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
      user () {
        return this.belongsTo('App/Models/User')
    }
    receptor(){
        return this.belongsTo('App/Models/Receptor')
      }
    post(){
        return this.belongsTo('App/Models/Post')
    }
      
}

module.exports = Notification
