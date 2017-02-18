var express = require('express');
var app = express();
var path = require('path');

//Env for Heroku (dyanmically adjusted)
var port = process.env.PORT || 8080;

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//dynamically toggle to port
app.listen(port);

//log if server is on
console.log('OyeTube Loaded ' + port);