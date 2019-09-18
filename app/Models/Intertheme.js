'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Intertheme extends Model {
    theme () {
        return this.belongsTo('App/Models/Theme')
    }
}

module.exports = Intertheme
