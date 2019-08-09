'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reply extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    post() {
        return this.belongsTo('App/Models/Post')
    }
    goals () {
        return this.hasMany('App/Models/Goal')
    }
}

module.exports = Reply
