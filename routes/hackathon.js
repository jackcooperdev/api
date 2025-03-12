const express = require('express');
const bike = require('../models/hackathon/bike');
const bus = require('../models/hackathon/bus');
const rail = require('../models/hackathon/rail');
const router = express.Router();

router.get('/bike', async (req, res) => {
    const data = await bike.find({},undefined,undefined);

    res.send(data)
})

router.get('/bus', async (req, res) => {
    const data = await bus.find({},undefined,undefined);

    res.send(data)
})


router.get('/rail', async (req, res) => {
    const data = await rail.find({},undefined,undefined);

    res.send(data)
})




module.exports = router;