'use strict'
const Goal = use('App/Models/Goal')
const User = use ('App/Models/User')

class GoalController {

    async newgoal({ request, response }){
        
        const goaldata = request.only(['title','description','recompensa']);
        
        const goal = new Goal();
        goal.title = goaldata.title;
        goal.description = goaldata.description;
        goal.recompensa = goaldata.recompensa;         
        await goal.save();
        
        return response.status(201).json(goal);

    }

    async showgoal ({ request, params, response }) {
        try {
            console.log(params.user_id, 'info data')
            const goal = await Goal.query()
            .where('id', params.id)
                
                .firstOrFail()

            return response.json({
                status: 'success',
                data: goal
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = GoalController
