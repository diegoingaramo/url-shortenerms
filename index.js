var express = require('express');
var app = express();
var url_generator = require('./url_generator');
var loki = require("lokijs");

var url = 'test.json';

var db = new loki(url);

var children = db.addCollection('children');

children.insert({name:'Sleipnir', legs: 8});
children.insert({name:'Jormungandr', legs: 0});
children.insert({name:'Hel', legs: 2});

console.log(children.get(1)); // returns Sleipnir
console.log(children.find( {'name':'Sleipnir'} ));



app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/public'));

app.get("/new/*", function(req, res) {
    var url = req.params[0]; // regexp's numbered capture group
    res.write(url_generator.getShortURL());
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