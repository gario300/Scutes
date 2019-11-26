'use strict'
const Goal = use('App/Models/Goal')
const User = use ('App/Models/User')
const intergoal = use ('App/Models/Intergoal')
const Ws = use('Ws')

class GoalController {

    async newgoal({ request, response }){
        
        const goaldata = request.only(['title','placa','description', 'recompensa']);
        
        const recompensa = parseInt(goaldata.recompensa, 10)

        const goal = new Goal();
        goal.nombregoal = goaldata.title;
        goal.imagengoal = goaldata.placa;
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
        
        const user = auth.current.user
        
        await user.goals().attach(2)
        
        user.puntos = user.puntos + 300
        await user.save();

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
    async updategoal({auth, response,params}){
        const user = auth.current.user

        const goal = await intergoal.query()
        .where('user_id', user.id)
        .where('goal_id', params.id)
        .where('is_readed', false)
        .with('goal')
        .update({ is_readed: true })

        return response.json({
            status: 'success',
            data: goal
          })
    }

    async goalnotfifications({auth}){

        const channel = Ws.getChannel('goals');
        const topic = channel.topic(auth.current.user.id);

        
        const logros = await Goal.query()
            .select(
            'goals.is_readed AS visto',
            'users.id AS userid'
            )
            .from('users')
            .leftJoin('intergoals as IT', 'IT.user_id', '=', 'users.id')
            .leftJoin('goals as goal', 'IT.goal_id', '=', 'goals.id')
            .whereNot('goal_id', null)
            .whereNot('user_id', null)
            .whereNot('visto', false)
            .where('user_id', auth.current.user)
            .where('nombretema', data.nombretema)
            .count('* as total')
            const total = logros[0].total 
        
            const emisor = false

            if (total >= 1) {
                emisor = true

            } else {emisor = false}

            if (emisor == true){

                topic.broadcast('message', emisor);

            }
    }
}

module.exports = GoalController
