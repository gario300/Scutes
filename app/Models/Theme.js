'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Theme extends Model {
    users () {
    return this.belongsToMany('App/Models/User')
    }
    intertheme () {
        return this.belongsTo('App/Models/Intertheme')
    }

}

module.exports = Theme
