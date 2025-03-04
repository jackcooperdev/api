const fastify = require('fastify')()
const hackathonRoute = require('./routes/hackathon');

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send(200)
})

fastify.get('/robots.txt', function (request, reply) {
    reply.send(`User-agent: *
Disallow: /`)
})
fastify.register(require('./db/hackathon'));
fastify.register(hackathonRoute, {prefix:'hackathon'});


// Run the server!
fastify.listen({port: process.env.PORT || 3000, host: '0.0.0.0'}, function (err) {
    if (err) {
        console.log(err)
        fastify.log.error(err)
        process.exit(1)
    }

    // Server is now listening on ${address}
})