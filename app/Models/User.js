'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class User extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'User.hashPassword')
      }

    
      static get hidden () {
        return ['password']
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
      tokens () {
        return this.hasMany('App/Models/Token')
      }
      goals () {
        return this.belongsToMany('App/Models/Goal', 'user_id', 'goal_id')
        .pivotTable('intergoals')
    }
    notifications(){
      return this.hasMany('App/Models/Notification')
    }
     
    conversation(){
      return this.belongsTo('App/Models/Conversation')
    }
    seenders(){
      return this.hasMany('App/Models/User')
    } 
    items(){
      return this.hasMany('App/Models/Item')
    }  
    themes () {
      return this.belongsToMany('App/Models/Theme', 'user_id', 'theme_id')
      .pivotTable('interthemes')
    }
    currentheme () {
      return this.hasOne('App/Models/Currentheme')
    }

}

module.exports = User
