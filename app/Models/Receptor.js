'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Receptor extends Model {
    notifications(){
        return this.hasMany('App/Models/Notification')
      } 

      user(){
        return this.hasOne('App/Models/User')
      }
}

module.exports = Receptor
