const express = require('express');
const bodyParser = require('body-parser');
const containerRoute = require('./routes/container');
const distanceRoute = require('./routes/distance');
const mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use('/container', containerRoute);
app.use('/distance', distanceRoute);

app.get('/', function(req, res) {
    res.send('Helloo');
});

app.listen(1502, function() {
    console.log('App is listening 1502');
});

mongoose.connect('mongodb://localhost:27017/EpicDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conected'))