const fastify = require('fastify')()
const hackathonRoute = require('./routes/hackathon');
const mariokartRoute = require('./routes/mariokart');
// Declare a route
fastify.get('/', function (request, reply) {
    reply.send(200)
})

fastify.get('/robots.txt', function (request, reply) {
    reply.send(`User-agent: * \nDisallow: /`)
})
fastify.register(require('./db/main'));
fastify.register(hackathonRoute, {prefix: 'hackathon'});
fastify.register(mariokartRoute, {prefix: 'mariokart'});


// Run the server!
fastify.listen({port: process.env.PORT || 3000, host: '0.0.0.0'}, function (err) {
    if (err) {
        console.log(err)
        fastify.log.error(err)
        process.exit(1)
    }

    // Server is now listening on ${address}
})