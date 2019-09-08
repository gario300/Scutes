'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    users(){
      return this.belongsToMany('App/Models/User', 'from_user_id', 'to_user_id')
      .pivotTable('conversation')
      }
      seenders(){
        return this.hasMany('App/Models/Seender')
        }   
}

module.exports = Conversation
