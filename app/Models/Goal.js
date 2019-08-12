'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Goal extends Model {    
        users () {
            return this.belongsToMany('App/Models/Goal')
        }
        

        

    
    


}
module.exports = Goal
