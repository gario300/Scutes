'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
      user () {
        return this.hasbelongsTo('App/Models/User')
    }
    post(){
        return this.belongsTo('App/Models/Post')
    }
      
}

module.exports = Notification
