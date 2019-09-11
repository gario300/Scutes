'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Intergoal extends Model {
    Goal () {
        return this.belongsTo('App/Models/Goal')
    }
}

module.exports = Intergoal
