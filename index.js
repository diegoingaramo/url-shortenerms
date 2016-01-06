var express = require('express');
var app = express();
//var date_generator = require('./date_generator');

app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/public'));

app.get("/new/*", function(req, res) {
    var url = req.params[0]; // regexp's numbered capture group
    res.end("new " + url);
});

app.get("/*", function(req, res) {
    var url = req.params[0]; // regexp's numbered capture group
    res.end("show " + url);
});

app.get(/.*/, function(request, response) {
  		response.sendFile('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
