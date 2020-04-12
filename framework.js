require('./api/data/db.js');
var express = require('express');
const https = require('https');
const fs = require('fs');
var forceSsl = require('express-force-ssl');
var cors = require('cors');

const options = {
    key: fs.readFileSync('credentials/key.pem'),
    cert: fs.readFileSync('credentials/cert.pem')
};

var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');

// Define the port to run on
//app.set('port', 3000);
// Add middleware to console log every request
app.use(function(req, res, next) {
    next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/fonts', express.static(__dirname + '/fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/api',routes);
app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(forceSsl);
app.use(cors);
// Listen for requests
https.createServer(options, app).listen(443);