var express = require('express');
var app = express();
var url_generator = require('./url_generator');
var url_validation = require('./url_validation');
var loki = require("lokijs");


var db_json = 'test.json';
var db_name = 'urls';
var db = new loki(db_json);
var urls = db.addCollection(db_name);

app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/public'));

app.get("/new/*", function(req, res) 
{

    var original_url = req.params[0]; // regexp's numbered capture group
    
    url_validation.checkUrlExists(original_url, function(exist){

        res.writeHead(200, { 'Content-Type': 'application/json' });
        
        if (exist)
        {
            var json_data = urls.find( {'original_url':original_url} );
            if (json_data.length > 0)      
                json_data = json_data[0];
            else
            {
                json_data = {original_url: original_url, short_url: url_generator.getShortURL() };
                urls.insert(json_data);     
            }
            res.end(JSON.stringify({original_url: json_data.original_url, short_url: "https://url-shortenerms.herokuapp.com/" + json_data.short_url }));    
        }
        else
        {
            res.end(JSON.stringify({original_url: "invalid url", short_url: "invalid url" })); 
        }

    });

});

app.get("/*", function(req, res) {
    var short_url = req.params[0]; // regexp's numbered capture group
    var json_data = urls.find( {'short_url':short_url} );
    if (json_data.length > 0)
    	res.redirect(307,json_data[0].original_url);
    else
    {
    	res.writeHead(200, { 'Content-Type': 'application/json' });
    	res.end(JSON.stringify({error:{code:"ENOTFOUND",errno:"ENOTFOUND", short_url:short_url}}));
    }
});

app.get(/.*/, function(req, res) {
  		res.sendFile('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});