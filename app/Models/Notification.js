'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
      users () {
        return this.hasMany('App/Models/User')
    }
    post(){
        return this.belongsTo('App/Models/Post')
    }
      
}

module.exports = Notification
