async function routes(fastify) {
    const lap = fastify.mongo.db.collection('laps')
    const tracks = fastify.mongo.db.collection('tracks')
    const users = fastify.mongo.db.collection('users')
    const { ObjectId } = require('mongodb');
    fastify.get('/timing', async (request, reply) => {
        const {track} = request.query;
        if (!track) {
            reply.status(500).send('Track Not Found');
            return;
        }
        const result = await lap.find({"track_id":new ObjectId(track)}).toArray();

        for (let idx in result) {
            const foundTrack = await tracks.findOne({"_id":new ObjectId(result[idx].track_id)})
            const foundUser = await users.findOne({"_id":new ObjectId(result[idx].user)})
            result[idx].track_id =foundTrack;
            result[idx].user = foundUser;
        }


        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    });

    fastify.get('/user', async () => {
        const result = await users.find().toArray();

        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    });

    fastify.get('/track', async () => {
        const result = await tracks.find().toArray();

        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    });


}


module.exports = routes;