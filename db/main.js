const fastifyPlugin = require('fastify-plugin')

/**
 * Connects to a MongoDB database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 */
async function dbConnector(fastify) {
    fastify.register(require('@fastify/mongodb'), {
        url: `mongodb+srv://api_access:${process.env.DB_TOKEN}@${process.env.DB_ADDRESS}/api_readonly`
    })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)