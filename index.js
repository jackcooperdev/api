const envToLogger = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    production: true,
    test: false,
  }

const fastify = require('fastify')({
    logger: envToLogger['development'] ?? true // defaults to true if no entry matches in the map
})

const jamesRoute = require('./routes/james_portfolio');

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send(200)
})

fastify.get('/robots.txt', function (request, reply) {
    reply.send(`User-agent: *
Disallow: /`)
})

fastify.register(jamesRoute, {prefix:'james_portfolio'})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})