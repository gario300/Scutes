'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
    User(){
        return this.hasbelongsTo('App/Models/User')
      }  
}

module.exports = Notification
