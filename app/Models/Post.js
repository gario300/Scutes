'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    replies() {
        return this.hasMany('App/Models/Reply')
    }
    favorites() {
        return this.hasMany('App/Models/Favorite')
    }
    post () {
        return this.belongsTo('App/Models/Post')
    }
    
}

module.exports = Post
