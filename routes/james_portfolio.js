const getRepoContents = require("../controllers/james-github");
const htmltoJson = require('html-to-json')
const path = require('path')
const fs = require('fs')
async function routes(fastify, options) {
    fastify.get('/UNHfPGxYhN4sb60eEcuc', async (request, reply) => {
        const data = await getRepoContents();
        return data
    })

    fastify.get('/blog', async (request, reply) => {
        const posts = await getRepoContents.processBlog();
        return posts;
    })

    fastify.get('/recommendations', async (request, reply) => {
        const posts = await getRepoContents.processRecomendations();
        return posts;
    })
    
}


module.exports = routes;