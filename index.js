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
    // logger: envToLogger['development'] ?? true //
})
const cors = require('@fastify/cors')
const jamesRoute = require('./routes/james_portfolio');
const hackathonRoute = require('./routes/hackathon');

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send(200)
})

fastify.get('/robots.txt', function (request, reply) {
    reply.send(`User-agent: *
Disallow: /`)
})
fastify.register(cors, { 
  origin:["https://jneville.uk"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // put your options here
})
fastify.register(require('./db/hackathon'));
fastify.register(jamesRoute, {prefix:'james_portfolio'});
fastify.register(hackathonRoute, {prefix:'hackathon'});


// Run the server!
fastify.listen({port: process.env.PORT || 3000, host: '0.0.0.0'}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})