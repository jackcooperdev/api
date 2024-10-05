const fastify = require('fastify')({
    logger: false
})

const jamesRoute = require('./routes/james');

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.register(jamesRoute, {prefix:'james'})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})