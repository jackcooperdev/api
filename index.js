// Main Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Route Files

const hackathonRoute = require('./routes/hackathon');
const mariokartRoute = require('./routes/mariokart');


// Enable Express
const app = express();

// Configure Mongoose (MongoDB)
mongoose.connect(`mongodb+srv://api_access:${process.env.DB_TOKEN}@${process.env.DB_ADDRESS}/default`)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(() => {
        console.log("Connection Failed");
    });

// Configure Express
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'));

// Routes

app.use('/hackathon',hackathonRoute);
app.use('/mariokart',mariokartRoute);


// Declare a route
app.get('/', function (req, res) {
    res.send(200)
})

// Declare Robots and Ping Route
app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
});




// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log(`JackCooperAPIS Client listening on port ${process.env.PORT || 3000}`);
})