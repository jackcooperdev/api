const getRepoContents = require("../controllers/james-github");

async function routes(fastify, options) {
    fastify.get('/UNHfPGxYhN4sb60eEcuc', async (request, reply) => {
        const data = await getRepoContents();
        return data
    })
}


module.exports = routes;