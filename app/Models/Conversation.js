'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    users(){
      return this.hasMany('App/Models/User')
      }
      seenders(){
        return this.hasMany('App/Models/Seender')
        }   
}

module.exports = Conversation
