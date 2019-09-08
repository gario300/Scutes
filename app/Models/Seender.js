'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Seender extends Model {
    conversation(){
        return this.belongsTo('App/Models/Conversation')
        }
}

module.exports = Seender
