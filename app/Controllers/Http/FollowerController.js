'use strict'
const User = use('App/Models/User')
const Follow = use('App/Models/Follow')

class FollowerController {
    async followers({params, request, response}){
        
        const page = request.only(['foo']);

        const follower = await Follow.query()
            .where('follower_id', params.id)
            .orderBy('created_at', 'DESC')
            .paginate(page,3)
    
            return response.json({
                status: 'success',
                data: follower
        })

    }
}

module.exports = FollowerController
