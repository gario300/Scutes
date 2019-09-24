'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Theme extends Model {
    user () {
    return this.belongsToMany('App/Models/Goal')
    }
    intertheme () {
        return this.belongsTo('App/Models/Intertheme')
    }

}

module.exports = Theme
