async function routes(fastify, options) {
    const bikes = fastify.mongo.db.collection('bike_stations')
    const bus = fastify.mongo.db.collection('bus_stops')
    const rail = fastify.mongo.db.collection('rail_stations')


    fastify.get('/bike', async (request, reply) => {
        const result = await bikes.find().toArray()
        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    });

    
    fastify.get('/bus', async (request, reply) => {
        const result = await bus.find().toArray()
        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    });

    
    fastify.get('/rail', async (request, reply) => {
        const result = await rail.find().toArray()
        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    });
}


module.exports = routes;