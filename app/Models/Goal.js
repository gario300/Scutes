'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Goal extends Model {    
        users () {
            return this.belongsToMany('App/Models/Goal', 'user_id', 'goal_id')
            .pivotTable('intergoals')
        }

        favorites(){
            return this.hasMany('App/Models/Favorite')
        }

        posts (){
            return this.hasMany('App/Models/Post')
        }

        replies(){
            return this.hasMany('App/Models/Reply')
        }
        followers () {
            return this.this.hasMany(
                'App/Models/User',
                'user_id',
                'follower_id'
            ).pivotTable('followers')
        }
        

        

    
    


}
module.exports = Goal
