const express = require('express');
const {ObjectId} = require("mongodb");
const lap = require('../models/mariokart/lap')
const users = require('../models/mariokart/user')
const tracks = require('../models/mariokart/tracks')

const router = express.Router();

router.get('/timing', async (req, res) => {
    const {track} = req.query;
    if (!track) {
        res.status(500).send('Track Not Found');
        return;
    }
    const result = await lap.find({"track_id":new ObjectId(track)})

    for (let idx in result) {
        const foundTrack = await tracks.findOne({"_id":new ObjectId(result[idx].track_id)})
        const foundUser = await users.findOne({"_id":new ObjectId(result[idx].user)})
        result[idx].track_id =foundTrack;
        result[idx].user = foundUser;
    }


    if (result.length === 0) {
        throw new Error('No documents found')
    }
    res.send(result)
})

router.get('/user', async (req,res) => {

    const result = await users.find()

    if (result.length === 0) {
        throw new Error('No documents found')
    }
    res.send(result)
});

router.get('/track', async (req,res) => {

    const result = await tracks.find()

    if (result.length === 0) {
        throw new Error('No documents found')
    }
    res.send(result)
});






module.exports = router;