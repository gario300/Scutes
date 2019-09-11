'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Intergoal extends Model {
    goal () {
        return this.belongsTo('App/Models/Goal')
    }
}

module.exports = Intergoal
