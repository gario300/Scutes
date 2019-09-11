'use strict'
const Goal = use('App/Models/Goal')
const User = use ('App/Models/User')
const intergoal = use ('App/Models/Intergoal')

class GoalController {

    async newgoal({ request, response }){
        
        const goaldata = request.only(['title','placa','description', 'recompensa']);
        
        const recompensa = parseInt(goaldata.recompensa, 10)

        const goal = new Goal();
        goal.title = goaldata.title;
        goal.placa = goaldata.placa;
        goal.description = goaldata.description;
        goal.recompensa = goaldata.recompensa
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

    async allgoals ({auth}){
        
        const firstgoal = await Goal.findBy('id', 2)
        const user = auth.current.user
        
        await user.goals().attach(firstgoal, (row) =>{
            
            row.user.puntos = user.puntos + firstgoal.recompensa
            await user.save()

        })




    }

    async getgoals ({auth,response}){

        const user = auth.current.user

        const goal = await intergoal.query()
        .where('user_id', user.id)
        .where('is_readed', false)
        .with('goal')
        .fetch()

        return response.json({
            status: 'success',
            data: goal
          })

    }
}

module.exports = GoalController
