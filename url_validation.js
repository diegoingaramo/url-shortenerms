exports.checkUrlExists = function (Url, callback) {
        var http = require('http'),
            url = require('url');

        if (url.parse(Url).protocol != "http:" && url.parse(Url).protocol != "https:"){
           callback(false);
           return; 
        }

        var options = {
            host: url.parse(Url).host,
            port: url.parse(Url).port || 80,
            path: url.parse(Url).pathname
        };
        var req = http.request(options, function (r) {
            callback(true);
        });
        req.on('error', function(err) {
           callback(false);
        });
        req.end();
    }