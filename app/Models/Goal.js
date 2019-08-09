'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Goal extends Model {    
        users () {
            return this.belongsToMany('App/Models/Goal', 'user_id', 'goal_id')
            .pivotTable('intergoals')
        }
        

        

    
    


}
module.exports = Goal
