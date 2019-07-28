'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class User extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeSave', 'User.hashPassword')
      }
      
    posts () {
        return this.hasMany('App/Models/Post')
    }
    followers () {
        return this.belongsToMany(
            'App/Models/User',
            'user_id',
            'follower_id'
        ).pivotTable('followers')
    }
    following () {
        return this.belongsToMany(
            'App/Models/User',
            'follower_id',
            'user_id'
        ).pivotTable('followers')
    }
    replies () {
        return this.hasMany('App/Models/Reply')
    }
    favorites () {
        return this.hasMany('App/Models/Favorite')
    }
    static get hidden () {
        return ['password']
      }
}

module.exports = User
