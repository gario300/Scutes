'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
      user () {
        return this.belongsTo('App/Models/User')
    }
    post(){
        return this.belongsTo('App/Models/Post')
    }
    theme(){
        return this.belongsTo('App/Models/Theme')
    }
    notifications(){
        return this.hasMany('App/Models/Notification')
    }
      
}

module.exports = Notification
