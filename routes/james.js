const getRepoContents = require("../controllers/james-github");

async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        const data = await getRepoContents();
        return data
    })
}


module.exports = routes;